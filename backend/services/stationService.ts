// services/station.service.ts
import { Station } from '../types';
import { ovRepository } from '../ovRepository';
import { sanitizeQuery } from '../utils/security';

/**
 * Service layer for station-related operations
 * Handles business logic for station data retrieval
 */

export const stationService = {
    /**
     * Retrieves all stations from the database
     * @returns {Promise<Station[]>} Array of all stations
     */
    getAllStations: async (): Promise<Station[]> => 
        ovRepository.getAllStations(),

    /**
     * Retrieves station for a specific city
     * @param {string} city - City name to search for
     * @returns {Promise<Station | null>} Station in the specified city or null if not found
     */
    getStationByCity: async (city: string): Promise<Station | null> =>
        ovRepository.getStationByCity(city),

    /**
     * Searches stations based on input text
     * @param query - Search text to filter stations
     * @returns Filtered list of stations
     */
    searchStations: async (query: string): Promise<Station[]> => {
        const callback = ovRepository.searchStations(query);

        return callback;
    }
};