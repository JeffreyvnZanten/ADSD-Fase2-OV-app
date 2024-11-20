// database/connection.ts
import sqlite3, { Database } from 'sqlite3';
import { readFileSync } from 'fs';
import path from 'path';

export const createConnection = (): Database => 
    new sqlite3.Database('sqlite.db');

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

const checkTableExists = (db: Database): Promise<boolean> =>
    new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'",
            (err, row) => err ? reject(err) : resolve(!!row)
        );
    });

const executeSchema = (db: Database): Promise<void> =>
    new Promise((resolve, reject) => {
        db.exec(
            readFileSync('schema.sql', 'utf-8'),
            err => err ? reject(err) : resolve()
        );
    });