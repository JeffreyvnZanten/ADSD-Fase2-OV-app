// repository/station.repository.ts
import { Database } from 'sqlite3';
import { Station } from './types';

export const ovRepository = {
    getAllStations: (db: Database): Promise<Station[]> =>
        new Promise((resolve, reject) => {
            db.all('SELECT * FROM stations', (err, rows) => {
                if (err) reject(err);
                resolve(rows as Station[]);
            });
        }),

        getStationByCity: async (db: Database, city: string): Promise<Station[]> =>
            new Promise((resolve, reject) => {
                db.all(
                    'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
                    [city.trim()], // Trim whitespace en case-insensitive vergelijking
                    (err, rows) => {
                        if (err) {
                            console.error('Database error:', err);
                            reject(err);
                        }
                        console.log(`Found stations for city ${city}:`, rows);
                        resolve(rows as Station[]);
                    }
                );
            }),

    getStationByCode: (db: Database, code: string): Promise<Station | null> =>
        new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM stations WHERE LOWER(code) = LOWER(?)',
                [code],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row as Station || null);
                }
            );
        })
};