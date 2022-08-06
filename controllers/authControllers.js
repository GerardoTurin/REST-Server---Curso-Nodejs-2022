import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import { generarToken } from '../helpers/generaToken.js';
import { googleVerify } from '../helpers/google-verify.js';






// Creamos y exportamos un controlador para el login ( autehtication )

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificamos si el email existe en la base de datos
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / contraseña incorrectos - email'
            })
        }
        // Verificamos si el usuario esta activo

        if( !usuario.estado ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / contraseña incorrectos - estado: false'
            });
        }

        // Verificamos si la contraseña es correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generamos el token
        const token = await generarToken( usuario._id );

        res.json({
            message: 'Login API CONTROLADOR OK',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor intente de nuevo'
        });
    }
};



const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, email, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ email }); // Buscamos si el usuario ( email ) existe en la base de datos

        if( !usuario ) { 

            // Si el usuario no existe, lo creamos
            const newUser = new Usuario({
                nombre,
                email,
                img,
                password: ':)',
                role: 'USER_ROLE',
                google: true
            });

            usuario = await newUser.save();
        } else {
            // Si el usuario existe, actualizamos sus datos
            usuario = await Usuario.findByIdAndUpdate( usuario._id, {
                nombre,
                img
            });
        }


        if( !usuario.estado ) {
            return res.status(401).json({
                ok: false,
                msg: 'Contacte con el administrador, el usuario no esta activo'
            });
        }

        // Generamos el token
        const token = await generarToken( usuario._id );

        res.json({
            message: 'Google OK',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'El token no pudo ser verificado'
        });
    }




}







export { 
    login,
    googleSingIn
};