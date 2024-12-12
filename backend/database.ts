// database/databaseService.ts
import BetterSqlite3 from 'better-sqlite3';
import type { Database } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

let database: Database | null = null;

// Helper om het juiste source pad te krijgen, rekening houdend met de dist directory
const getSourcePath = () => {
    // Als we in dist/backend draaien, gaan we twee levels omhoog en dan naar backend
    return path.resolve(__dirname, '..', 'backend');
};

const getDatabasePath = (): string => {
    const projectRoot = path.resolve(__dirname, '..');
    const dbFolder = path.join(projectRoot, 'data');
    return path.join(dbFolder, 'sqlite.db');
};

const getSchemaPath = (): string => {
    // We gebruiken getSourcePath om naar het originele schema.sql te verwijzen
    return path.join(getSourcePath(), 'schema.sql');
};

// Rest of your initialization code remains similar, but with better-sqlite3 syntax
const initialize = async (): Promise<void> => {
    if (!database) {
        const dbPath = getDatabasePath();
        const dbDir = path.dirname(dbPath);
        const schemaPath = getSchemaPath();

        console.log('Database path:', dbPath);
        console.log('Schema path:', schemaPath);

        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        try {
            // We use BetterSqlite3 to create the database instance
            database = new BetterSqlite3(dbPath);
            const schema = fs.readFileSync(schemaPath, 'utf-8');
            database.exec(schema);
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

// The query methods would be modified to use better-sqlite3's syntax:
const query = async <T>(sql: string, params: any[] = []): Promise<T[]> => {
    if (!database) throw new Error('Database not initialized');
    return database.prepare(sql).all(params) as T[];
};

const queryOne = async <T>(sql: string, params: any[] = []): Promise<T | null> => {
    if (!database) throw new Error('Database not initialized');
    return database.prepare(sql).get(params) as T | null;
};

const execute = async (sql: string): Promise<void> => {
    if (!database) throw new Error('Database not initialized');
    database.exec(sql);
};

// openbaar voor andere files
export const databaseService = {
    initialize,
    query,
    queryOne,
    execute
};