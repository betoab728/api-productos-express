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
const productos_1 = __importDefault(require("../routes/productos"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middleware();
        this.routes();
        this.database();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Servidor corriendo correctamente'
            });
        });
        this.app.use('/api/productos', productos_1.default);
    }
    middleware() {
        //parseando el body de la peticion
        this.app.use(express_1.default.json());
        // cors
        this.app.use((0, cors_1.default)());
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Server;
