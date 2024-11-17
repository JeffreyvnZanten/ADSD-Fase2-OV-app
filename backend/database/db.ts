// db.ts
import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import path from 'path';
import { Station } from '../types/types';

const db = new sqlite3.Database('sqlite.db', (error) => {
    if (error) {
        console.error('Database connection error:', error.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase(): void {
    const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    db.exec(schema, (error) => {
        if (error) {
            console.error('Error initializing database:', error.message);
        } else {
            console.log('Database initialized successfully');
        }
    });
}

export const getStations = (): Promise<Station[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM stations', (error, stations: Station[]) => {
            if (error) {
                reject(error);
            } else {
                resolve(stations);
            }
        });
    });
};