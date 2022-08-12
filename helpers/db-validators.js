import Role from '../models/role.js';
import Usuario from '../models/usuario.js';
import Categoria from '../models/categoria.js';
import Producto from '../models/producto.js';
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


const existeCategoria = async ( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido de mongoose`);
    }
    
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(` La categoria con id ${id} no existe en la base de datos`);
    }
};



const categoriaExistente = async (nombre = "", id) => {
    // SI YA ESTISTE LA CATEGORIA, NO SE PUEDE CREAR OTRA CON EL MISMO NOMBRE
    const existeCategoria = await Categoria.findOne({ nombre });
    
    if (existeCategoria && existeCategoria.id != id) {
        throw new Error(`La categoria ${nombre} ya existe`);
    }    
};






const existeProducto = async ( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido de mongoose`);
    }
    
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(` La Producto con id ${id} no existe en la base de datos`);
    }
};


const productoExistente = async (nombre = "", id) => {
    // SI YA ESTISTE LA CATEGORIA, NO SE PUEDE CREAR OTRA CON EL MISMO NOMBRE
    const existeProducto = await Producto.findOne({ nombre });

    if (existeProducto && existeProducto.id != id) {
        throw new Error(`El producto ${nombre} ya existe`);
    }

};



const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    if (!colecciones.includes(coleccion)) {
        throw new Error(`La colección ${coleccion} no está permitida, por favor seleccione una de las siguientes: ${colecciones}`);
    }

    return true;
}



export {
    roleValido,
    emailValido,
    idValidoPorUuario,
    existeCategoria,
    categoriaExistente,
    existeProducto,
    productoExistente,
    coleccionesPermitidas
}