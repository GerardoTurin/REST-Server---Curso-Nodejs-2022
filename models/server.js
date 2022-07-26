import express from 'express';
import cors from 'cors';
import router from '../routes/userRoute.js';

// Requests: Cuando el usuario hace una peticion
// Response: Cuando el servidor responde a una peticion


//! Creamos un servidor con express con clases

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'


        // Middlewares
        this.middlewares();




        // Rutas de mi app
        this.routes();
    }


    middlewares() {

        // Cors
        this.app.use( cors() ); // use: para usar un middleware


        // Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }));


        // Directorio carpeta publica
        this.app.use(express.static('public'));   // use: para usar un middleware
    }



    routes() {
        this.app.use( this.usuariosPath, router );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}



export default Server;