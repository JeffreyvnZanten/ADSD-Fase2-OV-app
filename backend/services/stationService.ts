// services/station.service.ts

import { Station } from '../../shared/types';
import { ovRepository } from '../ovRepository';

/**
 * Service layer for station-related operations
 * Handles business logic for station data retrieval
 */

export const stationService = {
    /**
     * Retrieves all stations from the database
     * @returns {Promise<Station[]>} Array of all station
     */
    
    getAllStations: async (): Promise<Station[]> => 
        ovRepository.getAllStations(),

    /**
    * Searches stations based on a search query
    */

    searchStations: async (query: string): Promise<Station[]> => {
        const callback = ovRepository.searchStations(query);

        return callback;
    }
};