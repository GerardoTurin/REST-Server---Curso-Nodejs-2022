import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { login } from '../controllers/authControllers.js';


const router = Router();



const validacionEmail = [ body('email', 'El correo es obligatorio').isEmail() ];
const validacionPassword = [ body('password', 'La contraseña es obligatoria').not().isEmpty() ];


router.post('/login', validacionEmail, validacionPassword , validarCampos , login); // Definimos la ruta post para el login ( autehtication )












export default router;