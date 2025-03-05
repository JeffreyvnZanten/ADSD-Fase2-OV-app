import { databaseService } from './database';
import { Station, navigation_step } from '../shared/types';

export const ovRepository = {
     /**
     * Retrieves all stations from the database.
     * This function performs a full table scan of the stations table.
     * 
     * @returns A Promise that resolves to an array of Station objects.
     *          Returns an empty array if no stations are found.
     * 
     * @example
     * const stations = await stationRepository.getAllStations();
     * console.log(stations); // [{id: 1, name: 'Central Station', ...}, ...]
     */

    getAllStations: async (): Promise<Station[]> => 
        databaseService.query<Station>('SELECT * FROM stations'),

    /**
     * Retrieves a station by its city name using a case-insensitive search.
     * The city name is trimmed of whitespace before searching.
     * 
     * @param city - The name of the city to search for
     * @returns A Promise that resolves to a Station object if found,
     *          or null if no station exists in the specified city
     * 
     * @example
     * const station = await stationRepository.getStationByCity('Amsterdam');
     * if (station) {
     *     console.log(station.name);
     * }
     */
    
    getStationByCity: async (city: string): Promise<Station | null> =>
        databaseService.queryOne<Station>(
            'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
            [city.trim()]
        ),

    // navigation steps is under contruction for now future use for showing the steps to the user
    // getAllNavigationSteps: async (): Promise<navigation_step[]>=> 
    //     databaseService.query('SELECT * FROM navigation_steps'),

    /**
     * Performs database search for stations
     * @param query - Search text to match against city names
     * @returns Matching stations from database
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