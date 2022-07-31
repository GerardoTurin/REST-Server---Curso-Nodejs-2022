import mongoose from "mongoose";
const { Schema, model } = mongoose;


const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es necesario'],
    },
});





export default model('Role', roleSchema);