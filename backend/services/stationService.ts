// services/station.service.ts
import { Database } from 'sqlite3';
import { Station } from '../types';
import { ovRepository } from '../ovRepository';

export const stationService = {
    getAllStations: async (db: Database): Promise<Station[]> => {
        return ovRepository.getAllStations(db);
    },

    getStationsByCity: async (db: Database, city: string): Promise<Station[]> => {
        return ovRepository.getStationByCity(db, city);
    }
};