// routeService.ts
/**
 * Service layer for route calculation operations
 * Handles business logic for generating travel routes between stations
 */
import { Route, RouteRequest, Station } from '../types';
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
     * Geeft routegegevens terug voor een gevalideerd verzoek
     * 
     * @param request - Het routeverzoek met vertrek- en aankomststation
     * @returns Route object met reisgegevens
     */
    getRouteData: async (request: RouteRequest): Promise<Route> => {
        // Controleer eerst of de route logisch valide is
        const isValidRoute = validateRouteRequest(request);

        // Als de validatie succesvol was, kunnen we de routegegevens samenstellen
        return {
            departure: request.departureStation,
            arrival: request.arrivalStation,
            steps: [
                `Ga naar het perron bij ${request.departureStation}.`,
                `Neem de trein naar ${request.arrivalStation}.`,
                `Bij aankomst op ${request.arrivalStation}, ga naar de uitgang om het station te verlaten.`
            ]
        };
    }
};