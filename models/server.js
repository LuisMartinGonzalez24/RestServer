const express = require('express');
const cors = require('cors');
const { dbConnection } =  require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
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
        this.app.use(this.userRoutes, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port: ', this.port);
        });
    }
}

module.exports = Server;
