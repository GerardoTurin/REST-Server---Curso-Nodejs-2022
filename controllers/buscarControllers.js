import { response, request } from 'express';
import Producto from '../models/producto.js';
import Categoria from '../models/categoria.js';
import Usuario from '../models/usuario.js';

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const coleccionesPermitidas = [
    'productos',
    'usuarios',
    'categorias'
];


const buscarUsuarios = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);    // Verificar si es un ObjectId valido

    if (esMongoId) {
        const usuario = await Usuario.find({ _id: termino, estado: true });
        return res.json({
            resultados: (usuario) ? [usuario] : [] 
        });
    }

    // expresion regular para buscar por nombre o email
    const regex = new RegExp(termino, 'i');


    // Buscar usuarios por el nombre o email
    const usuarios = await Usuario.find({ 
        $or: [ { nombre: regex }, { email: regex }],
        $and: [{ estado: true }]
    });

    return res.json({
        ok: true,
        resultado: usuarios
    });

};



const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);    // Verificar si es un ObjectId valido

    if (esMongoId) {
        const producto = await Producto.findById(termino)
                                                .populate('categoria', 'nombre');
        return res.json({
            resultados: (producto) ? [producto] : [] 
        });
    }
    // expresion regular para buscar por nombre o email
    const regex = new RegExp(termino, 'i');

    // Buscar usuarios por el nombre o email
    const productos = await Producto.find({  nombre: regex })
                                                    .populate('categoria', 'nombre');
    return res.json({
        resultado: productos
    });

};



const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);    // Verificar si es un ObjectId valido

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            resultados: (categoria) ? [categoria] : [] 
        });
    }
    // expresion regular para buscar por nombre o email
    const regex = new RegExp(termino, 'i');

    // Buscar usuarios por el nombre o email
    const categorias = await Categoria.find({  nombre: regex });

    return res.json({
        resultado: categorias
    });

};


//! ----------------------------------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------------------------------





const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: ` La coleccion ${coleccion} no es valida, las colecciones permitidas son: ${coleccionesPermitidas.join(', ')}`
        });
    }

    switch (coleccion) {
        case 'productos':
            buscarProductos(termino, res);
        break;
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;

        default:
            res.status(500).json({
                ok: false,
                msg: 'Busqueda no valida'
            });
            break;
    }
    

};






export {
    buscar
}