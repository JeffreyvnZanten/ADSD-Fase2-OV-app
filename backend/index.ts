// index.ts
import express from 'express';
import { api } from './api';
import cors from 'cors';
import { databaseService } from './database';

/**
 * Initializes and starts the application server.
 * Coordinates the startup sequence including database setup,
 * middleware configuration, and HTTP server initialization.
 */

const startApplicationServer = async () => {
    const app = express();
    
    try {
        // Initialize database connection and schema
        await databaseService.initialize();
        
        // This enables safe cross-domain requests by allowing only approved sites to retrieve data.
        app.use(cors());

        // This starts the express server and allows it to parse JSON requests.
        app.use(express.json());
        
        // Set up API routes
        app.use('/api', api());
        
        // Start HTTP server
        const serverPort = process.env.PORT || 4010;
        app.listen(serverPort, () => {
            console.log(`Server ready and listening on port ${serverPort}`);
        });
        
        // Handle graceful shutdown
        process.on('SIGTERM', () => {
            console.log('Shutting down server gracefully...');
            process.exit(0);
        });
        
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
};

// Initialize the application
startApplicationServer().catch(error => {
    console.error('Fatal application error:', error);
    process.exit(1);
});