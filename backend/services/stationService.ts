// services/station.service.ts
import { Database } from 'sqlite3';
import { Station } from '../types';
import { ovRepository } from '../ovRepository';

/**
 * Service layer for station-related operations
 * Handles business logic for station data retrieval
 */

export const stationService = {
    /**
     * Retrieves all stations from the database
     * @param {Database} db - SQLite database connection
     * @returns {Promise<Station[]>} Array of all stations
     */
    getAllStations: async (db: Database): Promise<Station[]> => {
        return ovRepository.getAllStations(db);
    },

    /**
     * Retrieves stations for a specific city
     * @param {Database} db - SQLite database connection
     * @param {string} city - City name to search for
     * @returns {Promise<Station[]>} Array of stations in the specified city
     */
    getStationsByCity: async (db: Database, city: string): Promise<Station[]> => {
        return ovRepository.getStationByCity(db, city);
    }
};