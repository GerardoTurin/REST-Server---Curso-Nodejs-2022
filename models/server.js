import express from 'express';
import cors from 'cors';
import router from '../routes/userRoute.js';
import routerAuth from '../routes/authRoute.js';
import { dbConection } from '../database/configDB.js';

// Requests: Cuando el usuario hace una peticion
// Response: Cuando el servidor responde a una peticion


//! Creamos un servidor con express con clases

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';    // Creamos una ruta para el login ( autehtication )

        //Coneccion a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }


    async conectarDB() {
        await dbConection();
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


    // Rutas de mi app
    routes() {
        this.app.use( this.usuariosPath, router );
        this.app.use( this.authPath, routerAuth );  // Definimos la ruta para el login ( autehtication )                    
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}



export default Server;