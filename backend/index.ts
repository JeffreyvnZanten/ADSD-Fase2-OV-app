// index.ts
import express from 'express';
import { createApi } from './api';
import cors from 'cors';
import { databaseService } from './database';

/**
 * Main application server that initializes and coordinates all components.
 * Handles server startup, middleware configuration, and API route setup.
 * Ensures proper database initialization before starting the HTTP server.
 */

/**
 * Initializes and starts the application server.
 * Coordinates the startup sequence including database setup,
 * middleware configuration, and HTTP server initialization.
 */
const startApplicationServer = async () => {
    const app = express();
    
    try {
        // Initialize database connection and schema
        // const database = await connectToDatabase();
        // await setupDatabaseSchema(database);
        await databaseService.initialize();
        
        // Configure middleware
        app.use(cors());
        app.use(express.json());
        
        // Set up API routes
        app.use('/api', createApi());
        
        // Start HTTP server
        const serverPort = process.env.PORT || 4010;
        app.listen(serverPort, () => {
            console.log(`Server ready and listening on port ${serverPort}`);
        });
        
        // Handle graceful shutdown
        process.on('SIGTERM', () => {
            console.log('Shutting down server gracefully...');
            // database.close();
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