import  jwt  from "jsonwebtoken";
import { response, request } from 'express';
import Usuario from '../models/usuario.js';

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    

    try {
        const { usuarioID } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(usuarioID);


        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe en la base de datos'
            });
        }



        // Validar que el uid tenga { Estado: true }
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no encontrado - Estado: false'
            });
        }



        
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}



export { validarJWT };