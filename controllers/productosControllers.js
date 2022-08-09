import { response, request } from 'express';
import Categoria from '../models/categoria.js';
import Producto from '../models/producto.js';



// Crear un Producto
const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;  // Ignorar el estado y el usuario

    const nombre = body.nombre;

    const productoDB = await Producto.findOne( { nombre }); // Buscar si existe el producto


    if (productoDB) {
        return res.status(400).json({
            ok: false,
            msg: ` El producto ${nombre} ya existe`
        });
    }

    // Crear el producto
    const producto = new Producto({
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    });

    await producto.save();

    res.json({
        ok: true,
        producto
    });
};



// Obtener Productos - paginado - populate - obtener el usuario que creo el producto
const obtenerProductos = async (req = request, res = response) => {
    // Traer todos los usuarios y hacer una paginación
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };    // Traer todos los usuarios activos ( estado: true )

    // total de usuarios en respuesta
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(desde)
        .limit(limite),
    ]);

    // cantidad de usuarios en respuesta
    const cantidadTraidos = productos.length;

    res.json({
        ok: true,
        total,
        cantidadTraidos,
        productos
    });
};



// Obtener Producto ID - populate - obtener el usuario que creo el producto
const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json({
        ok: true,
        producto
    });
};



// Actualizar un Producto  por ID - Privado - cualquier persona con token valido
const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;                      // id de la categoria a actualizar
    const { estado, usuario, ...data } = req.body;      // Extraer solo los campos que se van a actualizar

    data.nombe = data.nombre.toUpperCase();     // Convertir el nombre a mayusculas
    data.usuario = req.usuario._id;             // El usuario que actualiza la categoria

    const productoDB = await Producto.findByIdAndUpdate(id, data, { new: true }); // new: true = devuelve el objeto actualizado

    res.json({
        ok: true,
        productoDB
    });
};




// Borrar un Producto por ID - Privado - cualquier persona con token valido
const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params;                    // id de la categoria a actualizar
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true }); // new: true = devuelve el objeto actualizado

    res.json({
        ok: true,
        productoBorrado,
        msg: ` Producto ${productoBorrado.nombre} borrado - Estado: ${productoBorrado.estado}`
    });
}









export {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
