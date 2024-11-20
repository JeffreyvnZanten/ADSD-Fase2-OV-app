// index.ts
import express from 'express';
import { createConnection, initializeDatabase } from './connection';
import { createApi } from './api';
import cors  from 'cors'  

export const corsMiddleware = cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

const startServer = async () => {
    const app = express();
    const db = createConnection();
    
    try {
        await initializeDatabase(db);
        
        app.use(corsMiddleware);
        app.use(express.json());
        app.use('/api', createApi(db));
        
        const port = process.env.PORT || 4010;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();