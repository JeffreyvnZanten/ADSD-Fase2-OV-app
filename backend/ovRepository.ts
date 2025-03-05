import { databaseService } from './database';
import { Station } from '../shared/types';

export const ovRepository = {
     /**
     * Retrieves all stations from the database.
     * This function performs a full table scan of the stations table.
     */

    getAllStations: async (): Promise<Station[]> => 
        databaseService.query<Station>('SELECT * FROM stations'),

    /**
     * Retrieves a station by its city name using a case-insensitive search.
     * The city name is trimmed of whitespace before searching.
     */
    
    getStationByCity: async (city: string): Promise<Station | null> =>
        databaseService.queryOne<Station>(
            'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
            [city.trim()]
        ),

    /**
     * Performs database search for stations based on cityname
     */

    searchStations: async (query: string): Promise<Station[]> => {
        const searchPattern = `%${query}%`;
        
        const result = databaseService.query<Station>(
            `SELECT * FROM stations 
             WHERE LOWER(city) LIKE LOWER(?) 
             LIMIT 10`,
            [searchPattern]
        );

        return result;
    },
};