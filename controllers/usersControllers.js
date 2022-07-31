import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas


const usuariosGet = async (req = request, res = response) => {

    // Traer todos los usuarios y hacer una paginación
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };    // Traer todos los usuarios activos ( estado: true )

    

    // total de usuarios en respuesta
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)   
        .skip(desde)
        .limit(limite),
    ]);

    // cantidad de usuarios en respuesta
    const cantidadTraidos = usuarios.length;


    res.json({
        ok: true,
        total,
        cantidadTraidos,
        usuarios
        
    });

};


const usuariosPost = async (req = request, res = response) => {

    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario({ nombre, email, password, role });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Grabar en la base de datos
    await usuario.save();

    res.status(201).json({
        message: 'Post API CONTROLADOR',
        usuario
    });
};


const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;


    // Validar con la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    // Actualizar en la base de datos
    const usuarioAct = await Usuario.findByIdAndUpdate(id, resto, { new: true });


    res.json( usuarioAct );
};


const usuariosPatch = (req = request, res = response) => {
    res.json({
        message: 'Patch API CONTROLADOR'
    });
};


const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    // borrar en la base de datos
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, { estado: false });



    res.json(usuarioBorrado);
};


export { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};