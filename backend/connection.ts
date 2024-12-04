// connection.ts
import sqlite3, { Database } from 'sqlite3';
import { readFileSync } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

/**
 * Database connection and initialization module that handles cross-platform SQLite setup.
 * Provides functionality for creating database connections and ensuring proper schema initialization.
 * Handles platform-specific compatibility issues transparently.
 */

/**
 * Verifies and ensures SQLite compatibility with the current platform.
 * Attempts to load SQLite normally first, and if that fails, rebuilds
 * the binary specifically for the current operating system.
 */
const validatePlatformCompatibility = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            require('sqlite3');
            resolve();
        } catch (error) {
            console.log('Preparing SQLite for current platform...');
            const platformBuild = spawn('npm', ['rebuild', 'sqlite3'], {
                stdio: 'inherit',
                shell: true
            });
            
            platformBuild.on('close', (code) => {
                code === 0 
                    ? resolve()
                    : reject(new Error('Platform compatibility check failed'));
            });
        }
    });
};

/**
 * Creates a new database connection after ensuring platform compatibility.
 * This function handles all necessary platform-specific initialization steps
 * before establishing the connection.
 */
export const connectToDatabase = async (): Promise<Database> => {
    await validatePlatformCompatibility();
    return new sqlite3.Database('sqlite.db');
};

/**
 * Ensures the database schema is properly set up and initialized.
 * Creates necessary tables if they don't exist by executing the schema SQL.
 */
export const setupDatabaseSchema = async (db: Database): Promise<void> => {
    try {
        const tableExists = await verifyTableExists(db);
        if (!tableExists) {
            await createInitialSchema(db);
        }
    } catch (error) {
        throw new Error(`Schema initialization failed: ${error}`);
    }
}

/**
 * Verifies the existence of required database tables.
 * Checks if the core tables needed for the application exist.
 */
const verifyTableExists = (db: Database): Promise<boolean> =>
    new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'",
            (err, row) => err ? reject(err) : resolve(!!row)
        );
    });

/**
 * Creates the initial database schema from SQL definition file.
 * Executes the SQL commands defined in schema.sql to set up all necessary tables.
 */
const createInitialSchema = (db: Database): Promise<void> =>
    new Promise((resolve, reject) => {
        const schemaPath = path.join(__dirname, 'schema.sql');
        db.exec(
            readFileSync(schemaPath, 'utf-8'),
            err => err ? reject(err) : resolve()
        );
    });