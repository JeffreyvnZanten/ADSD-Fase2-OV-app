// routeService.ts
/**
 * Service layer for route calculation operations
 * Handles business logic for generating travel routes between stations
 */

import { Database } from 'sqlite3';
import { Route, RouteRequest, Station } from '../types';
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
     */
    calculateRoute: async (
        db: Database,
        request: RouteRequest
    ): Promise<Route> => {
        // Fetch station information from database
        const departureStation = await ovRepository.getStationByCity(
            db,
            request.departureStation
        );
        const arrivalStation = await ovRepository.getStationByCity(
            db,
            request.arrivalStation
        );
    
        // Validate request parameters including station existence
        validateRouteRequest(request, departureStation, arrivalStation);
    
        // Extra check voor TypeScript
        if (!departureStation || !arrivalStation) {
            throw new RouteNotFoundError('Stations niet gevonden');  // Dit zou nooit moeten gebeuren door de eerdere validatie
        }
    
        // Nu weet TypeScript zeker dat beide stations bestaan
        return {
            departure: departureStation.name,
            arrival: arrivalStation.name,
            steps: [
                `Ga naar ${departureStation.platform} bij ${departureStation.name}.`,
                `Neem de trein naar ${arrivalStation.name}.`,
                `Bij aankomst op ${arrivalStation.name}, ga naar de ${arrivalStation.exit} om het station te verlaten.`
            ]
        };
    }
}