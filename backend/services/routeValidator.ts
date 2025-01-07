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
 * Validates a route request by checking for required fields and business rules
 * 
 * @param request - The route request object to validate
 * @param departureStation - The departure station from database
 * @param arrivalStation - The arrival station from database
 * @throws {ValidationError} When validation fails with specific error message
 */
export function validateRouteRequest(
    request: RouteRequest,
    departureStation: Station | null,
    arrivalStation: Station | null
): void {
    // Check if stations are provided in request
    if (!request.departureStation || !request.arrivalStation) {
        throw new ValidationError('Selecteer eerst een vertrek- en aankomststation');
    }

    // Check if stations are the same
    if (request.departureStation === request.arrivalStation) {
        throw new ValidationError('Het vertrek- en aankomststation kunnen niet hetzelfde zijn');
    }

    // Check if stations exist are having a value
    if (!departureStation || !arrivalStation) {
        throw new ValidationError('Selecteer eerst een vertrek- en aankomststation');
    }
}