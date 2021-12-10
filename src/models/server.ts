import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import routes from '../routes/index';
import path from 'path';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        

        // Connect to database
        this.initializeDatabase();
        
        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async initializeDatabase() {
        await dbConnection();
    }

    middlewares() {

        // Cors
        this.app.use(cors());

        // Reading data received
        this.app.use(express.json());

        // Public Directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(routes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port: ', this.port);
        });
    }
}

export default Server;
