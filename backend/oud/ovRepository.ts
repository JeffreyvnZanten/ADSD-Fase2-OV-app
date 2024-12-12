// ovRepository.ts
import { Database } from 'sqlite3';
import { Station } from './types';

/**
 * Repository layer for database operations related to stations
 * Handles direct database queries and data access
 */
export const ovRepository = {
    /**
     * Retrieves all stations from the database
     * @param {Database} db - SQLite database connection
     * @returns {Promise<Station[]>} Array of all stations
     */
    getAllStations: (db: Database): Promise<Station[]> =>
        new Promise((resolve, reject) => {
            db.all('SELECT * FROM stations', (err, rows) => {
                if (err) reject(err);
                resolve(rows as Station[]);
            });
        }),

    /**
     * Retrieves station for a specific city
     * @param {Database} db - SQLite database connection
     * @param {string} city - City name to search for
     * @returns {Promise<Station | null>} Matching station or null if not found
     */
    getStationByCity: async (db: Database, city: string): Promise<Station | null> =>
        new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
                [city.trim()],
                (err, row) => {
                    if (err) {
                        console.error('Database error:', err);
                        reject(err);
                    }
                    console.log(`Found station for city ${city}:`, row);
                    resolve(row as Station || null);
                }
            );
        }),

    /**
     * Retrieves a station by its code
     * @param {Database} db - SQLite database connection
     * @param {string} code - Station code to search for
     * @returns {Promise<Station | null>} Matching station or null if not found
     */
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