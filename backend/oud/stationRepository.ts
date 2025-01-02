// // repositories/stationRepository.ts
// import { Station } from './types';
// import { databaseService } from './database';

// /**
//  * Repository responsible for managing station-related database operations.
//  * Provides methods to query and retrieve station information from the database.
//  * All methods perform case-insensitive searches when applicable.
//  */
// export const stationRepository = {
//     /**
//      * Retrieves all stations from the database.
//      * This function performs a full table scan of the stations table.
//      * 
//      * @returns A Promise that resolves to an array of Station objects.
//      *          Returns an empty array if no stations are found.
//      * 
//      * @example
//      * const stations = await stationRepository.getAllStations();
//      * console.log(stations); // [{id: 1, name: 'Central Station', ...}, ...]
//      */
//     getAllStations: async (): Promise<Station[]> => 
//         databaseService.query<Station>('SELECT * FROM stations'),

//     /**
//      * Retrieves a station by its city name using a case-insensitive search.
//      * The city name is trimmed of whitespace before searching.
//      * 
//      * @param city - The name of the city to search for
//      * @returns A Promise that resolves to a Station object if found,
//      *          or null if no station exists in the specified city
//      * 
//      * @example
//      * const station = await stationRepository.getStationByCity('New York');
//      * if (station) {
//      *     console.log(station.name);
//      * }
//      */
//     getStationByCity: async (city: string): Promise<Station | null> =>
//         databaseService.queryOne<Station>(
//             'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
//             [city.trim()]
//         ),

//     /**
//      * Retrieves a station by its unique station code using a case-insensitive search.
//      * 
//      * @param stationsCode - The unique identifier code of the station
//      * @returns A Promise that resolves to a Station object if found,
//      *          or null if no station matches the provided code
//      * 
//      * @example
//      * const station = await stationRepository.getStationByCode('NYC001');
//      * if (station) {
//      *     console.log(station.name);
//      * }
//      */
//     getStationByCode: async (stationsCode: string): Promise<Station | null> =>
//         databaseService.queryOne<Station>(
//             'SELECT * FROM stations WHERE LOWER(code) = LOWER(?)',
//             [stationsCode]
//         )
// };