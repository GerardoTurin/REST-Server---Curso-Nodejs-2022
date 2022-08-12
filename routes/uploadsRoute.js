import { Router } from 'express';
import { body, param, check } from 'express-validator';
import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from '../controllers/uploadsControllers.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import { validarArchivo } from '../middlewares/validar-archivo.js';
import { validarCampos } from '../middlewares/validar-campos.js';



const router = Router();


const validacionID = [ param('id', 'No es un ID válido').isMongoId()];
const validaColeccion = [ param('coleccion').custom( ( c ) => coleccionesPermitidas(c, ['usuarios', 'productos']) ) ];
const validacionEmail = [ body('email', 'El correo es obligatorio').isEmail() ];
const validacionPassword = [ body('password', 'La contraseña es obligatoria').not().isEmpty() ];
//const validacionGoogle = [ body('id_token', 'id_token de google es necesario').not().isEmpty() ];



//POST - Cargar archivo
router.post('/', validarArchivo, cargarArchivo );




// PUT - Actualizar un archivo
router.put('/:coleccion/:id',
                    validarArchivo,
                    validacionID,
                    validaColeccion,
                    validarCampos,
                    actualizarImagenCloudinary );
                    //actualizarArchivo );





// GET - Obtener un archivo
router.get('/:coleccion/:id',
                        validacionID,
                        validaColeccion,
                        validarCampos, mostrarImagen);









export default router;