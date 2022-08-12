import { response, request } from 'express';

const validarArchivo = (req = request, res = response, next) => {

    // Si no hay archivos subidos, entonces muestra un mesaje de error
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {    
        return res.status(400).json({ msg: 'No se subió ningún archivo - validarArchivo' });
    }
    next();
};






export {
    validarArchivo
}