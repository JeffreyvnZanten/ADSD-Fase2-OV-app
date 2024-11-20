import { Database } from 'sqlite3';
import { Route, RouteRequest } from '../types';
import { ovRepository } from '../ovRepository';

export const routeService = {
    calculateRoute: async (
        db: Database,
        request: RouteRequest
    ): Promise<Route | null> => {
        try {
            // Zoek stations op basis van stadsnaam
            const departureStations = await ovRepository.getStationByCity(
                db,
                request.departureStation
            );
            const arrivalStations = await ovRepository.getStationByCity(
                db,
                request.arrivalStation
            );

            // Validatie checks
            if (!departureStations.length || !arrivalStations.length) {
                throw new Error('Beide stations moeten geldig zijn.');
            }

            const departure = departureStations[0];
            const arrival = arrivalStations[0];

            // Check of stations verschillend zijn
            if (departure.city === arrival.city) {
                throw new Error('Vertrek- en aankomststation moeten verschillend zijn.');
            }

            // Maak route met de correcte instructies
            const route: Route = {
                departure: departure.name,
                arrival: arrival.name,
                steps: [
                    `Ga naar ${departure.platform} bij ${departure.name}.`,
                    `Neem de trein naar ${arrival.name}.`,
                    `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
                ]
            };

            return route;

        } catch (error) {
            console.error('Error in calculateRoute:', error);
            throw error;
        }
    }
};