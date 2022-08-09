import { Router } from 'express';
import { buscar } from '../controllers/buscarControllers.js';





const router = Router();



// GET - Buscar productos
router.get('/:coleccion/:termino', buscar );


















export default router;