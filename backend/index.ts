/**
 * Main Application Server
 * 
 * This file serves as the entry point for the OV application server. It handles
 * the core setup of the Express application, including database initialization,
 * middleware configuration, and server startup.
 * 
 * Key Components:
 * - Express.js for HTTP server functionality
 * - SQLite database connection and initialization
 * - CORS middleware for handling cross-origin requests
 * - JSON parsing middleware for request body handling
 * - API route mounting for all endpoints
 * 
 * The server follows a modular architecture where database connection, API routes,
 * and server initialization are separated into distinct, manageable components.
 */

import express from 'express';
import { createConnection, initializeDatabase } from './connection';
import { createApi } from './api';
import cors from 'cors';

/**
 * Initializes and starts the Express server
 * 
 * This function performs the following operations in sequence:
 * 1. Creates a new Express application instance
 * 2. Establishes a database connection
 * 3. Initializes the database schema if needed
 * 4. Sets up middleware (CORS and JSON parsing)
 * 5. Mounts API routes
 * 6. Starts the HTTP server on the configured port
 * 
 * The server uses port 4010 by default but can be configured via
 * the PORT environment variable.
 * 
 * Error handling is implemented to gracefully handle startup failures
 * and exit the process if critical initialization steps fail.
 * 
 * @returns {Promise<void>}
 */
const startServer = async () => {
    const app = express();
    const db = createConnection();
    
    try {
        await initializeDatabase(db);
        
        app.use(cors());
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

// Initialize the server
startServer();