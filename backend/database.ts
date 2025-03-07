// database/databaseService.ts
import BetterSqlite3 from 'better-sqlite3';
import type { Database } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { readdirSync } from 'fs';

// check if the database is initialized and set it to null if it is not
let database: Database | null = null;

// this function will get the path to the backend folder
const getSourcePath = () => {
    return path.resolve(__dirname, '..', 'backend');
};

// this function will get the path to the sqlite database
const getDatabasePath = (): string => {
    const projectRoot = path.resolve(__dirname, '..');
    const dbFolder = path.join(projectRoot, 'data');
    return path.join(dbFolder, 'sqlite.db');
};

// this function will read all the sql files in the sql directory
const getSqlFiles = (directory: string): string[] => {
    try {
        return readdirSync(directory)
            .filter(file => file.endsWith('.sql'))
            .map(file => path.join(directory, file));
    } catch (error) {
        console.error('Error reading SQL directory:', error);
        return [];
    }
};

// this function will sort the sql files in the sql directory by name of the file
const getSortedSqlFiles = (directory: string): string[] => {
    return getSqlFiles(directory).sort((a, b) => {
        const fileA = path.basename(a);
        const fileB = path.basename(b);
        return fileA.localeCompare(fileB);
    });
};

// this function will initialize the database with a try catch block to handle any errors
const initialize = async (): Promise<void> => {
    if (!database) {
        const dbPath = getDatabasePath();
        const dbDir = path.dirname(dbPath);

        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        try {
            database = new BetterSqlite3(dbPath);
            await setupSchema();
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }
};

//  checks if table a name is empty
const isTableEmpty = async (tableName: string): Promise<boolean> => {
    if (!database) throw new Error('Database not initialized');
    
    const result = await queryOne<{ count: number }>(
        `SELECT COUNT(*) as count FROM ${tableName}`
    );
    
    return result?.count === 0;
};

// Returns all table names in the database
const getAllTableNames = async (): Promise<string[]> => {
    if (!database) throw new Error('Database not initialized');
    
    const tables = await query<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('schema_migrations', 'sqlite_sequence')"
    );
    
    return tables.map(table => table.name);
};

// This function will check if all tables are empty
const areAllTablesEmpty = async (): Promise<boolean> => {
    const tableNames = await getAllTableNames();
    
    for (const tableName of tableNames) {
        if (!(await isTableEmpty(tableName))) {
            return false;
        }
    }
    
    return true;
};

// This function will execute all the sql files in the sql directory
const setupSchema = async (): Promise<void> => {
    if (!database) throw new Error('Database not initialized');
    
    const tablesEmpty = await areAllTablesEmpty();
    
    if (!tablesEmpty) {
        console.log('Tables already contain data, skipping SQL execution');
        return;
    }
    
    const sqlDirectory = path.join(getSourcePath(), 'sql');
    const sqlFiles = getSortedSqlFiles(sqlDirectory);
    
    for (const sqlFile of sqlFiles) {
        try {
            console.log(`Executing SQL file: ${sqlFile}`);
            const sqlContent = fs.readFileSync(sqlFile, 'utf-8');
            await execute(sqlContent);
        } catch (error) {
            console.error(`Error executing SQL file ${sqlFile}:`, error);
            throw error;
        }
    }
};

// The query function takes an sql query string and an optional array of parameters using generics to define the return type
const query = async <T>(sql: string, params: any[] = []): Promise<T[]> => {
    if (!database) throw new Error('Database not initialized');
    //  securtiy measure to prevent sql injection trough the query prepared statement
    return database.prepare(sql).all(params) as T[];
};

// Defines a query object that processes one query and returns the result as an object
const queryOne = async <T>(sql: string, params: any[] = []): Promise<T | null> => {
    if (!database) throw new Error('Database not initialized');
    //  securtiy measure to prevent sql injection trough the query prepared statement 
    return database.prepare(sql).get(params) as T | null;
};

// the execute function takes an sql query string and executes it without returning any result
const execute = async (sql: string): Promise<void> => {
    if (!database) throw new Error('Database not initialized');
    database.exec(sql);
};

export const databaseService = {
    initialize,
    query,
    queryOne,
    execute
};

// What is prepare in database.prepare(sql).get(params) as T[] op regel 129;
// security measure to prevent sql injection trough the query prepared statement explained
// The key security aspect is that the data you pass in can NEVER change the structure of the original SQL query because:
// The database engine treats the placeholder value as pure data, not as SQL code
// The SQL is already compiled before any user input is received
// The parameter binding happens at a lower level in the database engine, after SQL parsing