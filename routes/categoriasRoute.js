import { Router } from 'express';
import { body, check, param, query } from 'express-validator';
import { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria, 
        borrarCategoria} from '../controllers/categControllers.js';
import { categoriaExistente, existeCategoria } from '../helpers/db-validators.js';

// Middlewares
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-JWT.js';
import { adminRole } from '../middlewares/validar-roles.js';



const router = Router();



//! Validaciones de campos
const validacionNombre = [ body('nombre', 'El nombre es obligatorio').not().isEmpty() ];
const validaIDcategoria = [ param('id', 'No es un ID válido').isMongoId().custom( existeCategoria ) ];
const categoriaYaExiste = [check("nombre", "id").custom(categoriaExistente)];








// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias );

// Obtener una categoria por ID
router.get('/:id',
            validaIDcategoria,
            validarCampos,
            obtenerCategoria );


// Crear una categoria - Privado - cualquier persona con token valido
router.post('/', 
            validarJWT,
            validacionNombre,
            validarCampos,
            crearCategoria );


// Actualizar una categoria  por ID - Privado - cualquier persona con token valido
router.put('/:id',
            validarJWT,
            validacionNombre,
            validaIDcategoria,
            categoriaYaExiste,
            validarCampos,
            actualizarCategoria);


// Eliminar una categoria si tiene Role: ADMIN_ROLE - Privado
router.delete('/:id',
                validarJWT,
                adminRole,
                validaIDcategoria,
                validarCampos,
                borrarCategoria);















export default router;