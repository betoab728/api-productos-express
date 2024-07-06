import express, { Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/productos';
import db from '../db/connection';

class Server {

    private app: express.Application;
    private port: string ;

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.listen();

        this.middleware();

        this.routes();

        this.database();
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

    routes() {  
        this.app.get('/', (req: Request, res : Response) => {
            
            res.json({
            
                message: 'Servidor corriendo correctamente'
            });
        });

        this.app.use('/api/productos', routesProducto);
    }

    middleware() {  
        //parseando el body de la peticion
        this.app.use(express.json()); 
        // cors
        this.app.use(cors())  ;

    }

    async database() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.log(error);
        }
    }
   
}

export default Server ;