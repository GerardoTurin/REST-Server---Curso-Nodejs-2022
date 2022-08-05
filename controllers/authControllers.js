import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import { generarToken } from '../helpers/generaToken.js';






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








export { 
    login 
};