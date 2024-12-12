// routeValidator.ts
import { RouteRequest, Station } from '../types';

/**
 * Custom error class for route validation failures
 * Extends the standard Error class to provide validation-specific error handling
 */
export class ValidationError extends Error {
    /**
     * Creates a new ValidationError instance
     * @param message - The validation error message
     */
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
        this.name = 'ValidationError';
    }
}

/**
 * Controleert of beide stations zijn opgegeven in het verzoek.
 * Gooit een ValidationError als één of beide stations ontbreken.
 */
function validateStationsProvided(request: RouteRequest): void {
    if (!request.departureStation || !request.arrivalStation) {
        throw new ValidationError('Selecteer eerst een vertrek- en aankomststation');
    }
}

/**
 * Controleert of het vertrek- en aankomststation verschillend zijn.
 * Gooit een ValidationError als de stations hetzelfde zijn.
 */
function validateDifferentStations(request: RouteRequest): void {
    if (request.departureStation === request.arrivalStation) {
        throw new ValidationError('Het vertrek- en aankomststation kunnen niet hetzelfde zijn');
    }
}

/**
 * Valideert een route aanvraag door alle validatieregels te controleren.
 * Retourneert true als de route valide is, gooit een ValidationError bij ongeldige input.
 * 
 * @param request - Route aanvraag met vertrek- en aankomststation
 * @returns boolean die aangeeft of de route valide is
 * @throws ValidationError bij ongeldige route
 */
export function validateRouteRequest(request: RouteRequest): boolean {
    // Voer alle validaties uit
    validateStationsProvided(request);
    validateDifferentStations(request);
    
    // Als de validaties zijn goed gegaan dan returned de functie true
    return true;
}