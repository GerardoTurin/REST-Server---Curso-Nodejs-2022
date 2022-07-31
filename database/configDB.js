import colors from 'colors';    // Importar módulo colors
import mongoose from "mongoose";


const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        });
        console.log('Base de datos ONLINE'.green);
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos'.red);
    }
};





export {
    dbConection
}