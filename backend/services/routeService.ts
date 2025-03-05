// routeService.ts
/**
 * Service layer for route calculation operations
 * Handles business logic for generating travel routes between stations
 */

import { Route, RouteRequest, Station } from '../../shared/types';
import { validateRouteRequest } from './routeValidator';
import { ovRepository } from '../ovRepository';
import { databaseService } from '../database';

/**
 * Custom error class for when a requested route cannot be found or generated
 * Used when stations exist but no valid route can be established between them
 */
export class RouteNotFoundError extends Error {
    /**
     * Creates a new RouteNotFoundError object
     */
    constructor(message: string) {
        super(message);
        this.name = 'RouteNotFoundError';
    }
}

/**
 * Service object containing route calculation functionality
 * 
 * REFACTOR THIS TO ONE FUNCTION INSTEAD OF AN OBJECT AND FUNCTION
 */

export const routeService = {
    /**
     * Calculates a travel route between two stations
     */
    
    calculateRoute: async (
        request: RouteRequest
    ): Promise<Route> => {
        // Fetch station information from database
        const departureStation = await ovRepository.getStationByCity(
            request.departureStation
        );
        const arrivalStation = await ovRepository.getStationByCity(
            request.arrivalStation
        );
    
        // Validate request parameters including station existence
        validateRouteRequest(request);
    
        // TypeScript null check safeguard
        if (!departureStation || !arrivalStation) {
            throw new RouteNotFoundError('Stations niet gevonden');  // This should never happen due to validation on line 49
        }

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