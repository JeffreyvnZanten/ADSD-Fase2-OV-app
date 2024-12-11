// database/databaseService.ts
import sqlite3, { Database } from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';

let database: Database | null = null;

// Helper om het juiste source pad te krijgen, rekening houdend met de dist directory
const getSourcePath = () => {
    // Als we in dist/backend draaien, gaan we twee levels omhoog en dan naar backend
    return path.resolve(__dirname, '..', 'backend');
};

const getDatabasePath = (): string => {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const dbFolder = path.join(projectRoot, 'data');
    return path.join(dbFolder, 'sqlite.db');
};

const getSchemaPath = (): string => {
    // We gebruiken getSourcePath om naar het originele schema.sql te verwijzen
    return path.join(getSourcePath(), 'schema.sql');
};

const initialize = async (): Promise<void> => {
    if (!database) {
        const dbPath = getDatabasePath();
        const dbDir = path.dirname(dbPath);
        const schemaPath = getSchemaPath();

        // Debug logging om te zien welke paden worden gebruikt
        console.log('Database path:', dbPath);
        console.log('Schema path:', schemaPath);

        if (!fs.existsSync(schemaPath)) {
            throw new Error(`Schema file not found at: ${schemaPath}`);
        }

        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        try {
            database = new sqlite3.Database(dbPath);
            const schema = fs.readFileSync(schemaPath, 'utf-8');
            await new Promise<void>((resolve, reject) => {
                database!.exec(schema, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }
};

const setupSchema = async (): Promise<void> => {
    if (!database) throw new Error('Database not initialized');
    
    const hasTable = await queryOne<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'"
    );
    
    if (!hasTable) {
        const schemaPath = getSchemaPath();
        try {
            const schema = fs.readFileSync(schemaPath, 'utf-8');
            await execute(schema);
        } catch (error) {
            console.error('Error reading or executing schema:', error);
            throw error;
        }
    }
};

// meerdere queries
const query = async <T>(sql: string, params: any[] = []): Promise<T[]> => {
    if (!database) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
        database!.all(sql, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows as T[]);
        });
    });
};

// single query
const queryOne = async <T>(sql: string, params: any[] = []): Promise<T | null> => {
    if (!database) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
        database!.get(sql, params, (err, row) => {
            if (err) reject(err);
            resolve(row as T || null);
        });
    });
};

// voer query uit
const execute = async (sql: string): Promise<void> => {
    if (!database) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
        database!.exec(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

// openbaar voor andere files
export const databaseService = {
    initialize,
    query,
    queryOne,
    execute
};