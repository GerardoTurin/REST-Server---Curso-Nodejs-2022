import Role from '../models/role.js';
import Usuario from '../models/usuario.js';
import mongoose from "mongoose";

const roleValido = async ( role = '' ) => {
        const existeRole = await Role.findOne({ role });
        if (!existeRole) {
            throw new Error(` El rol ${role} no existe en la base de datos`);
        }
        
};


const emailValido = async ( email = '' ) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(` El email ${email} ya está registrado`);
    }
}


const idValidoPorUuario = async ( id ) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido de mongoose`);
    }
    
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(` El usuario con id ${id} no existe en la base de datos`);
    }

    /*

    OTRA FORMA DE VALIDAR EL ID

    const existeUsuarioPorId = async( id ) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById( id ).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
    };
    -----------------

    router.put('/:id', [
    check('id').custom( existeUsuarioPorId ), // Aquí se realizan las dos validaciones
    validarCampos
    ], usuariosPut);
    

     */
}



export {
    roleValido,
    emailValido,
    idValidoPorUuario
}