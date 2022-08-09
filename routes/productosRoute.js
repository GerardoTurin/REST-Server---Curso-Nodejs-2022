import { Router } from 'express';
import { body, check, param, query } from 'express-validator';
import { actualizarProducto, borrarProducto, crearProducto, obtenerProducto, obtenerProductos } from '../controllers/productosControllers.js';
import { existeCategoria, existeProducto, productoExistente } from '../helpers/db-validators.js';




// Middlewares
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-JWT.js';
import { adminRole } from '../middlewares/validar-roles.js';


const router = Router();



//! Validaciones de campos
const validacionNombre = [ body('nombre', 'El nombre es obligatorio').not().isEmpty() ];
const validaIDproducto = [ param('id', 'No es un ID válido').isMongoId().custom( existeProducto ) ];
const validaIDcategoria = [ body('categoria', 'No es un ID válido').isMongoId().custom( existeCategoria ) ];
const productoYaExiste = [body("nombre", "id").custom(productoExistente)];



// POST
router.post('/',
            validarJWT,
            validacionNombre,
            validaIDcategoria,
            validarCampos,
            crearProducto  );


// GET
router.get('/', obtenerProductos );




// GET - // Obtener una Producto por ID
router.get('/:id',
            validaIDproducto,
            validarCampos,
            obtenerProducto );



// PUT - // Actualizar una Producto  por ID - Privado - cualquier persona con token valido
router.put('/:id',
            validarJWT,
            validacionNombre,
            validaIDproducto,
            productoYaExiste,
            validarCampos,
            actualizarProducto );



 // DELETE -  Borra un producto si tiene Role: ADMIN_ROLE - Privado
router.delete('/:id',
                validarJWT,
                adminRole,
                validaIDproducto,
                validarCampos,
                borrarProducto );

















export default router;