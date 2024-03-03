"use strict";

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import AdminRoutes from '../src/admin/admin.routes.js'
import LogRoutes from '../src/auth/auth.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/EnterpriseApi/v1/admin';
        this.logPath = '/EnterpriseApi/v1/login';
        this.middlewares();
        this.conectarDBInsana();
        this.routes();
    }

    async conectarDBInsana(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.adminPath, AdminRoutes);
        this.app.use(this.logPath, LogRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;