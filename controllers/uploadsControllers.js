import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from 'fs';

import cloudinary from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL );

import { response, request } from 'express';
import { subirArchivo } from '../helpers/subirArchivo.js';
import Usuario from '../models/usuario.js';
import Producto from '../models/producto.js';


const cargarArchivo = async (req = request, res = response) => {
    
    try {
        // Para Imagenes
        const pathArchivo = await subirArchivo(req.files, undefined, 'imagenes');
        
        // Para txt, md
        //const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        res.json({ 
            nombre: pathArchivo
        });
        
    } catch (error) {
        res.status(400).json({ error });
    }
        
};



/* const actualizarArchivo = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(400).json({ msg: 'La colección no es válida' });
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // Borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);

        if ( fs.existsSync(pathImagen) ) {
            fs.unlinkSync(pathImagen);  // Elimina el archivo
        }
            
    }
        
        const nombre = await subirArchivo(req.files, undefined, coleccion);    // Esta linea es para subir archivos de texto, imagenes, etc.
        modelo.img = nombre;
        
        await modelo.save();    // Guardar el archivo en la base de datos
        
        res.json({ 
            msg: 'Actualizar archivo',
            modelo
        });
}; */




const actualizarImagenCloudinary = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(400).json({ msg: 'La colección no es válida' });
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');

        cloudinary.v2.uploader.destroy(public_id);
    }

    // Subir imagen a Cloudinary
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);
        
        modelo.img = secure_url;
        await modelo.save();    // Guardar el archivo en la base de datos
        
        res.json(modelo);
};




const mostrarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(400).json({ msg: 'La colección no es válida' });
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // Borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);

        // Si el archivo existe
        if ( fs.existsSync(pathImagen) ) {
             return res.sendFile(pathImagen);  // Envia el archivo
        }
    } else {

        // Si no existe el archivo, entonces muestra una imagen por defecto
        const imgPorDefecto = path.join(__dirname, '../assets/', 'no-image.jpg');
        return res.sendFile(imgPorDefecto);
    }

};










export {
    cargarArchivo,
    mostrarImagen,
    actualizarImagenCloudinary
}