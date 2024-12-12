// mockStationRepository.test.ts
import { mockStationRepository } from '../backend/mockStationRepository';

describe('MockStationRepository', () => {
    // Test voor het ophalen van alle stations
    describe('getAllStations', () => {
        it('should return all mock stations', async () => {
            const stations = await mockStationRepository.getAllStations();

            // Dan controleren we of de stations de juiste data bevatten
            expect(stations).toEqual([
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
            ]);

            // Dan controleren we of de stations de juiste data bevatten
            expect(stations).not.toEqual([
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
                },
                {
                    id: 3,
                    name: 'Utrecht Centraal',
                    city: 'Utrecht',
                    code: 'UTR',
                    platform: '1-24',
                    exit: 'Centrum, West'
                }
            ]);
            
            // Controleer of we het juiste aantal stations krijgen
            expect(stations.length).toBe(2);
        });
    });
});