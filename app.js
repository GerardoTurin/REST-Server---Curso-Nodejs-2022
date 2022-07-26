/* import path from "path";
import hbs from 'hbs'; */


import 'dotenv/config'      // Cargar variables de entorno
import Server from './models/server.js';



const server = new Server();

server.listen();





