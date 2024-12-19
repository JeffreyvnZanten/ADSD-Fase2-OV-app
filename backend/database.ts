// database/databaseService.ts
import BetterSqlite3 from 'better-sqlite3';
import type { Database } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { readdirSync } from 'fs';

let database: Database | null = null;

const getSourcePath = () => {
    return path.resolve(__dirname, '..', 'backend');
};

const getDatabasePath = (): string => {
    const projectRoot = path.resolve(__dirname, '..');
    const dbFolder = path.join(projectRoot, 'data');
    return path.join(dbFolder, 'sqlite.db');
};

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

const getSortedSqlFiles = (directory: string): string[] => {
    return getSqlFiles(directory).sort((a, b) => {
        const fileA = path.basename(a);
        const fileB = path.basename(b);
        return fileA.localeCompare(fileB);
    });
};

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

const isTableEmpty = async (tableName: string): Promise<boolean> => {
    if (!database) throw new Error('Database not initialized');
    
    const result = await queryOne<{ count: number }>(
        `SELECT COUNT(*) as count FROM ${tableName}`
    );
    
    return result?.count === 0;
};

const getAllTableNames = async (): Promise<string[]> => {
    if (!database) throw new Error('Database not initialized');
    
    const tables = await query<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('schema_migrations', 'sqlite_sequence')"
    );
    
    return tables.map(table => table.name);
};

const areAllTablesEmpty = async (): Promise<boolean> => {
    const tableNames = await getAllTableNames();
    
    for (const tableName of tableNames) {
        if (!(await isTableEmpty(tableName))) {
            return false;
        }
    }
    
    return true;
};

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

export const databaseService = {
    initialize,
    query,
    queryOne,
    execute
};