/**
 * Service layer for route calculation operations
 * Handles business logic for generating travel routes between stations
 */

import { Database } from 'sqlite3';
import { Route, RouteRequest } from '../types';
import { ovRepository } from '../ovRepository';
import { validateRouteRequest } from './routeValidator';

/**
 * Custom error class for when a requested route cannot be found or generated
 * Used when stations exist but no valid route can be established between them
 */
export class RouteNotFoundError extends Error {
    /**
     * Creates a new RouteNotFoundError instance
     * @param message - The error message describing why the route couldn't be found
     */
    constructor(message: string) {
        super(message);
        this.name = 'RouteNotFoundError';
    }
}

/**
 * Service object containing route calculation functionality
 */
export const routeService = {
    /**
     * Calculates a travel route between two stations
     * 
     * Process flow:
     * 1. Validates the route request
     * 2. Retrieves station information from database
     * 3. Verifies both stations exist
     * 4. Generates step-by-step route instructions
     * 
     * @param db - Database connection instance
     * @param request - Route request containing departure and arrival stations
     * @returns Promise resolving to a Route object with step-by-step instructions
     * @throws {ValidationError} When request validation fails
     * @throws {RouteNotFoundError} When stations cannot be found or no route exists
     * 
     * @example
     * ```typescript
     * const route = await routeService.calculateRoute(db, {
     *   departureStation: "Amsterdam",
     *   arrivalStation: "Rotterdam"
     * });
     * ```
     */
    calculateRoute: async (
        db: Database,
        request: RouteRequest
    ): Promise<Route> => {
        // Validate request parameters
        validateRouteRequest(request);

        // Fetch station information from database
        const departureStations = await ovRepository.getStationByCity(
            db,
            request.departureStation
        );
        const arrivalStations = await ovRepository.getStationByCity(
            db,
            request.arrivalStation
        );

        // Verify both stations exist in database
        if (!departureStations.length || !arrivalStations.length) {
            throw new RouteNotFoundError('Beide stations moeten geldig zijn.');
        }

        const departure = departureStations[0];
        const arrival = arrivalStations[0];

        // Generate and return route with step-by-step instructions
        return {
            departure: departure.name,
            arrival: arrival.name,
            steps: [
                `Ga naar ${departure.platform} bij ${departure.name}.`,
                `Neem de trein naar ${arrival.name}.`,
                `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
            ]
        };
    }
};