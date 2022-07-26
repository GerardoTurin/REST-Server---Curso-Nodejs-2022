import { response, request } from 'express';


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No Ingresado', page = 1, apikey } = req.query;

    res.json({
        message: 'Get API CONTROLADOR',
        q,
        nombre,
        page,
        apikey
    });
};


const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        message: 'Post API CONTROLADOR',
        nombre,
        edad
    });
};


const usuariosPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        message: 'Put API CONTROLADOR',
        id
    });
};


const usuariosPatch = (req = request, res = response) => {
    res.json({
        message: 'Patch API CONTROLADOR'
    });
};


const usuariosDelete = (req = request, res = response) => {
    res.json({
        message: 'Delete API CONTROLADOR'
    });
};


export { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};