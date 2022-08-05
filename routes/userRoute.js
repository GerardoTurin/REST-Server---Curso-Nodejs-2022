import { Router } from 'express';
import { body, param, query } from 'express-validator';

// Middlewares
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-JWT.js';
import { adminRole, asignaRole } from '../middlewares/validar-roles.js';

import { emailValido, roleValido, idValidoPorUuario } from '../helpers/db-validators.js';
import { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete } 
    from '../controllers/usersControllers.js';



const router = Router();

const validacionNombre = [ body('nombre', 'El nombre es necesario').not().isEmpty() ];
const validacionEmail = [ body('email', 'El correo no es valido').custom( emailValido ).isEmail() ];
const validacionPassword = [ body('password', 'La contraseña es obligatoria y/o debe tener mas de 6 caracteres').isLength({ min: 6 }) ];
const validacionRole = [ body('role').custom( roleValido ) ];
const validacionID = [ param('id', 'No es un ID válido').isMongoId().custom( idValidoPorUuario ) ];
const limitePginacion = [ query('limite', 'Limite debe ser un valor numérico').isNumeric().optional() ];
const desdePginacion = [ query('desde', 'Desde debe ser un valor numérico').isNumeric().optional() ];

router.get('/', limitePginacion, desdePginacion, validarCampos , usuariosGet );


router.post('/', validacionNombre,
                validacionEmail,
                validacionPassword,
                validacionRole,
                validarCampos,
                usuariosPost );

router.put('/:id', validacionID, validacionRole , validarCampos ,usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', validarJWT, 
                    //adminRole,
                    asignaRole('ADMIN_ROLE', 'USER_ROLE'),
                    validacionID ,
                    validarCampos ,
                    usuariosDelete );



export default router;