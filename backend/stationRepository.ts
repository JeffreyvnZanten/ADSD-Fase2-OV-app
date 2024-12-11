// repositories/stationRepository.ts
import { Station } from './types';
import { databaseService } from './database';

export const stationRepository = {
    getAllStations: async (): Promise<Station[]> => 
        databaseService.query<Station>('SELECT * FROM stations'),

    getStationByCity: async (city: string): Promise<Station | null> =>
        databaseService.queryOne<Station>(
            'SELECT * FROM stations WHERE LOWER(city) = LOWER(?)',
            [city.trim()]
        ),

    getStationByCode: async (stationsCode: string): Promise<Station | null> =>
        databaseService.queryOne<Station>(
            'SELECT * FROM stations WHERE LOWER(code) = LOWER(?)',
            [stationsCode]
        )
};