import mongoose from "mongoose";
const { Schema, model } = mongoose;



const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es Obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



//! Para que no se muestre el password en la respuesta

usuarioSchema.method('toJSON', function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
});




export default model('Usuario', usuarioSchema);








