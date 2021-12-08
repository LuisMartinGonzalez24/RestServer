"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.userRoutes = '/api/user';
        // Connect to database
        this.initializeDatabase();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Reading data received
        this.app.use(express_1.default.json());
        // Public Directory
        this.app.use(express_1.default.static('public'));
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
exports.default = Server;
//# sourceMappingURL=server.js.map