import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import Categoria from '../models/categoria.js';



// obtenerCatgoria - populate - obtener el usuario que creo la categoria
const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        ok: true,
        categoria
    });
};


// obtener categorias - paginado - populate - obtener el usuario que creo la categoria
const obtenerCategorias = async (req = request, res = response) => {
    // Traer todos los usuarios y hacer una paginación
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };    // Traer todos los usuarios activos ( estado: true )

    // total de usuarios en respuesta
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(desde)
        .limit(limite),
    ]);

    // cantidad de usuarios en respuesta
    const cantidadTraidos = categorias.length;

    res.json({
        ok: true,
        total,
        cantidadTraidos,
        categorias
    });
}



const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre }); // Buscar si existe la categoria

    if (categoriaDB) {
        return res.status(400).json({
            ok: false,
            msg: ` La categoria ${nombre} ya existe`
        });
    }


    // Generar la data a guardar en la base de datos
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria(data);
    
    // Grabar en la base de datos
    await categoria.save();
    
    res.json({
        ok: true,
        categoria
    });
};



// Actualizar una categoria  por ID - Privado - cualquier persona con token valido
const actualizarCategoria = async (req = request, res = response) => {

    const { id } = req.params;                      // id de la categoria a actualizar
    const { estado, usuario, ...data } = req.body;      // Extraer solo los campos que se van a actualizar

    data.nombe = data.nombre.toUpperCase();     // Convertir el nombre a mayusculas
    data.usuario = req.usuario._id;             // El usuario que actualiza la categoria

    const categoriaDB = await Categoria.findByIdAndUpdate(id, data, { new: true }); // new: true = devuelve el objeto actualizado

    res.json({
        ok: true,
        categoria: categoriaDB
    });
};


// borrar una categoria por ID - Privado - cualquier persona con token valido
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;                    // id de la categoria a actualizar
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true }); // new: true = devuelve el objeto actualizado

    res.json({
        ok: true,
        categoria: categoriaBorrada,
        msg: ` Categoria ${categoriaBorrada.nombre} borrada - Estado: ${categoriaBorrada.estado}`
    });
}




export { 
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria,
    obtenerCategorias
};