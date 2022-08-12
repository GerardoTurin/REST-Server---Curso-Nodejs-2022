import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from '../routes/userRoute.js';
import routerAuth from '../routes/authRoute.js';
import routerBuscar from '../routes/buscarRoute.js';
import routerCategorias from '../routes/categoriasRoute.js';
import routerProductos from '../routes/productosRoute.js';
import routerUploads from '../routes/uploadsRoute.js';
import { dbConection } from '../database/configDB.js';

// Requests: Cuando el usuario hace una peticion
// Response: Cuando el servidor responde a una peticion


//! Creamos un servidor con express con clases

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.paths = {
            authPath: '/api/auth',          // Creamos una ruta para el login ( autehtication )
            buscarPath: '/api/buscar',      // Creamos una ruta para busqueda
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            usuariosPath: '/api/usuarios',
            uploadsPath: '/api/uploads',
        }


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

        // File uploads - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));


    }


    // Rutas de mi app
    routes() {
        this.app.use( this.paths.usuariosPath, router );
        this.app.use( this.paths.buscarPath, routerBuscar );
        this.app.use( this.paths.categoriasPath, routerCategorias );
        this.app.use( this.paths.productosPath, routerProductos );
        this.app.use( this.paths.authPath, routerAuth );  // Definimos la ruta para el login ( autehtication )                    
        this.app.use( this.paths.uploadsPath, routerUploads );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}



export default Server;