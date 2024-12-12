// tests/mocks/mockStationRepository.ts
import { IStationRepository } from "./stationRepository";
import { Station } from './types';

const mockStations: Station[] = [
    {
        id: 1,
        name: 'Amsterdam Centraal',
        city: 'Amsterdam',
        code: 'AMS',
        platform: '1-15',
        exit: 'Noord, Centrum, Zuid'
    },
    {
        id: 2,
        name: 'Rotterdam Centraal',
        city: 'Rotterdam',
        code: 'RTD',
        platform: '1-12',
        exit: 'Centrum, Proveniersplein'
    }
];

export const mockStationRepository: IStationRepository = {
    getAllStations: async () => mockStations,

    getStationByCity: async (city: string) => 
        mockStations.find(station => 
            station.city.toLowerCase() === city.toLowerCase()
        ) || null,

    getStationByCode: async (stationCode: string) =>
        mockStations.find(station => 
            station.code.toLowerCase() === stationCode.toLowerCase()
        ) || null
};