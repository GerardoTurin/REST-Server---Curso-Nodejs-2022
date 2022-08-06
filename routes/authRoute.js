import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { googleSingIn, login } from '../controllers/authControllers.js';


const router = Router();



const validacionEmail = [ body('email', 'El correo es obligatorio').isEmail() ];
const validacionPassword = [ body('password', 'La contraseña es obligatoria').not().isEmpty() ];
const validacionGoogle = [ body('id_token', 'id_token de google es necesario').not().isEmpty() ];


router.post('/login',           // Definimos la ruta post para el login ( autehtication )
                validacionEmail,
                validacionPassword ,
                validarCampos ,
                login
            ); 



// Google Authentication
router.post('/google',      //  Definimos la ruta post para el login con google ( autehtication )
                validacionGoogle ,
                validarCampos ,
                googleSingIn
            ); 












export default router;