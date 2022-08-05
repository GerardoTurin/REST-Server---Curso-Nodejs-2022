import { response, request } from 'express';

const adminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol de un usuario sin validar el JWT primero'
        });
    }

    const { role, nombre } = req.usuario;

    if (role !== 'ADMIN_ROLE') {
        res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no tiene permisos para realizar esta acción`
        });
    } 
    next();
};



const asignaRole = ( ...roles ) => {    // ...roles es un array de roles
    return (req = request, res = response, next) => {

        const { role } = req.usuario;

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol de un usuario sin validar el JWT primero'
            });
        } else if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los roles: ${roles.join(', ')}`
            });
        }
        next();
    }
}







export { 
    adminRole,
    asignaRole
};