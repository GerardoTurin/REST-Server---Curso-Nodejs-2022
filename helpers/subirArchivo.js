import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'], carpeta = '') => {

    return new Promise((resolve, reject) => {           // Función que se ejecuta cuando se sube el archivo

        const { archivo } = files;  // archivo: archivo que se subió
        const nombreCortado = archivo.name.split('.');  // nombreCortado: nombre del archivo con su extensión
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];   // extensionArchivo: extensión del archivo
    
    
        // Extensiones permitidas
        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extensión ${extensionArchivo} no es válida. Extensiones válidas: ${extensionesValidas.join(', ')}`);
        }
        
        // Nombre de archivo personalizado
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreArchivo );
        
        archivo.mv(uploadPath, (err) => {
            if (err) {
            reject(err);
            }
    
            resolve( nombreArchivo );
        });
    });


};





export {
    subirArchivo
}