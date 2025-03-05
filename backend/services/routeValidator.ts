// routeValidator.ts

import { RouteRequest, Station } from '../../shared/types';

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
        this.name = 'ValidationError';
    }
}

/**
* Validates a route request by checking for required fields and business rules
*/

export function validateRouteRequest(request: RouteRequest): void {
    const { departureStation, arrivalStation } = request;

    // Check if stations are provided in request
    if (!departureStation || !arrivalStation) {
        throw new ValidationError('Selecteer eerst een vertrek- en aankomststation');
    }

    // Check if stations are the same
    if (departureStation === arrivalStation) {
        throw new ValidationError('Het vertrek- en aankomststation kunnen niet hetzelfde zijn');
    }
}