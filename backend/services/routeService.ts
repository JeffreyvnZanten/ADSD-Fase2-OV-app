/**
 * Service layer for route calculation operations
 * Handles business logic for generating travel routes between stations
 */

import { Database } from 'sqlite3';
import { Route, RouteRequest } from '../types';
import { ovRepository } from '../ovRepository';

export const routeService = {
    /**
     * Calculates a route between two stations
     * @param {Database} db - SQLite database connection
     * @param {RouteRequest} request - Contains departure and arrival station information
     * @returns {Promise<Route | null>} Calculated route or null if no route found
     * @throws {Error} If stations are invalid or calculation fails
     */
    calculateRoute: async (
        db: Database,
        request: RouteRequest
    ): Promise<Route | null> => {
        try {
            const departureStations = await ovRepository.getStationByCity(
                db,
                request.departureStation
            );
            const arrivalStations = await ovRepository.getStationByCity(
                db,
                request.arrivalStation
            );

            if (!departureStations.length || !arrivalStations.length) {
                throw new Error('Beide stations moeten geldig zijn.');
            }

            const departure = departureStations[0];
            const arrival = arrivalStations[0];

            if (departure.city === arrival.city) {
                throw new Error('Vertrek- en aankomststation moeten verschillend zijn.');
            }

            return {
                departure: departure.name,
                arrival: arrival.name,
                steps: [
                    `Ga naar ${departure.platform} bij ${departure.name}.`,
                    `Neem de trein naar ${arrival.name}.`,
                    `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
                ]
            };

        } catch (error) {
            console.error('Error in calculateRoute:', error);
            throw error;
        }
    }
};