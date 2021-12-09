import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import UserRoute from '../routes/user';


class Server {

    private app: Application;
    private port: string;
    private userRoutes: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.userRoutes = '/api/user';

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
        this.app.use(this.userRoutes, UserRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port: ', this.port);
        });
    }
}

export default Server;
