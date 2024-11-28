// database/connection.ts
import sqlite3, { Database } from 'sqlite3';
import { readFileSync } from 'fs';
import path from 'path';

/**
 * Database Connection and Initialization Module
 * 
 * This module handles all database connection and setup operations.
 * It provides functions to create a new database connection and initialize
 * the required database schema.
 * 
 * Key Concepts:
 * - SQLite: Lightweight, file-based database
 * - Promises: For handling asynchronous database operations
 * - Schema Management: Creating and checking database tables
 * 
 * Database Structure:
 * - Single file: 'sqlite.db'
 * - Main table: 'stations' (created from schema.sql)
 */

/**
 * Creates a new SQLite database connection
 * 
 * @returns {Database} New SQLite database instance
 * 
 * Implementation Details:
 * - Creates or opens 'sqlite.db' file
 * - Returns database connection object
 * - Connection remains open until explicitly closed
 * 
 * Example Usage:
 * const db = createConnection();
 * // use db for queries
 * // remember to close when done: db.close();
 */
export const createConnection = (): Database => 
    new sqlite3.Database('sqlite.db');

/**
 * Initializes the database by checking and creating required tables
 * 
 * @param {Database} db - Active database connection
 * @throws {Error} If initialization fails
 * 
 * Implementation Flow:
 * 1. Checks if stations table exists
 * 2. If not, executes schema creation script
 * 3. Handles any errors during process
 * 
 * Example Usage:
 * const db = createConnection();
 * await initializeDatabase(db);
 */
export const initializeDatabase = async (db: Database): Promise<void> => {
    try {
        const exists = await checkTableExists(db);
        if (!exists) {
            await executeSchema(db);
        }
    } catch (error) {
        throw new Error(`Database initialization failed: ${error}`);
    }
}

/**
 * Checks if the stations table exists in the database
 * 
 * @param {Database} db - Active database connection
 * @returns {Promise<boolean>} True if table exists, false otherwise
 * 
 * Implementation Details:
 * - Queries sqlite_master table for stations table
 * - Returns boolean based on existence
 * - Wraps SQLite callback in Promise for async/await support
 */
const checkTableExists = (db: Database): Promise<boolean> =>
    new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'",
            (err, row) => err ? reject(err) : resolve(!!row)
        );
    });

/**
 * Executes the SQL schema creation script
 * 
 * @param {Database} db - Active database connection
 * @returns {Promise<void>}
 * 
 * Implementation Details:
 * - Reads schema.sql file from disk
 * - Executes all SQL statements in the file
 * - Handles potential file reading and SQL execution errors
 * 
 * Note: schema.sql should contain all CREATE TABLE statements
 */
const executeSchema = (db: Database): Promise<void> =>
    new Promise((resolve, reject) => {
        const schemaPath = path.join(__dirname, 'schema.sql');
        db.exec(
            readFileSync(schemaPath, 'utf-8'),
            err => err ? reject(err) : resolve()
        );
    });