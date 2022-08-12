import mongoose from "mongoose";
const { Schema, model } = mongoose;


const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario']
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es necesaria'],
    },
    description: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }
});




//! Para que no se muestre el __v y el estado en la respuesta

productoSchema.method('toJSON', function() {
    const { __v, estado , ...data } = this.toObject();   // toObject() es un método de mongoose que devuelve un objeto con todos los campos de la base de datos
    return data;
});


export default model('Producto', productoSchema);