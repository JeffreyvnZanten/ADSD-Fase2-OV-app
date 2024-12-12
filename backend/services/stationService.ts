// services/station.service.ts
import { Database } from 'sqlite3';
import { Station } from '../types';
import { stationRepository } from '../stationRepository';

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
    getAllStations: async (): Promise<Station[]> => 
        stationRepository.getAllStations(),

    /**
     * Retrieves station for a specific city
     * @param {Database} db - SQLite database connection
     * @param {string} city - City name to search for
     * @returns {Promise<Station | null>} Station in the specified city or null if not found
     */
    getStationByCity: async (city: string): Promise<Station | null> =>
        stationRepository.getStationByCity(city)
};