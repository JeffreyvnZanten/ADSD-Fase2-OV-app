// services/routeValidator.ts
import { RouteRequest } from '../types';

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
 * 
 * Performs validation checks on:
 * - Presence of both departure and arrival stations 
 * - Stations are not identical
 * 
 * @param request - The route request object to validate
 * @throws {ValidationError} When validation fails with specific error message
 * 
 * @example
 * ```typescript
 * // Valid request
 * validateRouteRequest({
 *   departureStation: "Amsterdam",
 *   arrivalStation: "Rotterdam"
 * });
 * 
 * // Invalid request - will throw ValidationError
 * validateRouteRequest({
 *   departureStation: "Amsterdam",
 *   arrivalStation: "Amsterdam"
 * });
 * ```
 */
 export function validateRouteRequest(request: RouteRequest): void {
    if (!request.departureStation || !request.arrivalStation) {
        throw new ValidationError('Selecteer eerst een vertrek- en aankomststation');
    }
 
    if (request.departureStation === request.arrivalStation) {
        throw new ValidationError('Het vertrek- en aankomststation kunnen niet hetzelfde zijn');
    }
 }