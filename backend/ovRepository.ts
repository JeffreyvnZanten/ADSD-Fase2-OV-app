import { databaseService } from './database';
import { Station } from '../shared/types';

// Creates a repository object that contains functions to interact with the database.

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

    // Retrieve all routes based on schedule
    getAllSchedulesByDate: async (date: string): Promise<any[]> => {
        let result = await databaseService.query('SELECT * FROM schedules WHERE date = ?', [date]);

        // log here otherwise it doesnt show since we use promise and await
        console.log(result);

        return result;
    },

    getRoute: async (): Promise<any[]> => {
        let result = await databaseService.query( 'SELECT * FROM routes');

        return result;
    }
};