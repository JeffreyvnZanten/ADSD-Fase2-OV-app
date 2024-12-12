// api.ts
import express, { Request, Response } from 'express';
import { Station, Route, ApiError, RouteRequest } from './types';
import { stationService } from './services/stationService';
import { routeService } from './services/routeService';
import { RouteNotFoundError } from './services/routeService';
import { ValidationError } from './services/routeValidator';

/**
 * API Route Definitions
 * 
 * This file defines all REST API endpoints for the OV application.
 * It uses Express.js for routing and handles all HTTP requests.
 * 
 * API Structure:
 * - GET /stations: Retrieve all stations
 * - GET /stations/:city: Get stations for a specific city
 * - GET /route: Calculate route between two stations
 * 
 * Creates and configures the Express router
 * 
 * @param {Database} db - SQLite database connection
 * @returns {express.Router} Configured Express router with all endpoints
 * 
 * Implementation Details:
 * 1. Creates new Express router instance
 * 2. Defines all API endpoints
 * 3. Implements error handling for each route
 */
export const createApi = () => {
    const router = express.Router();

    /**
     * GET /api/stations
     * Retrieves all available train stations
     * 
     * Response:
     * - Success: Array of Station objects
     * - Error: ApiError object with status 500
     * 
     * Example Response:
     * [
     *   {
     *     "id": 1,
     *     "name": "Amsterdam Centraal",
     *     "code": "AMS",
     *     ...
     *   }
     * ]
     */
    router.get('/stations', async (_req: Request, res: Response<Station[] | ApiError>) => {
        try {
            const stations = await stationService.getAllStations();
            res.json(stations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stations' });
        }
    });

    /**
     * GET /api/stations/:city
     * Retrieves all stations for a specific city
     * 
     * URL Parameters:
     * - city: Name of the city to search for
     * 
     * Response Codes:
     * - 200: Stations found
     * - 404: No stations found for city
     * - 500: Server error
     */
    router.get('/stations/:city', async (req: Request, res: Response<Station | ApiError>) => {
        try {
            const station = await stationService.getStationByCity(req.params.city);
            if (!station) {
                res.status(404).json({ error: 'No station found for this city' });
                return;
            }
            res.json(station);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch station' });
        }
    });

    /**
     * GET /api/route
     * Calculates a route between two stations
     * 
     * Query Parameters:
     * - RouteRequest
     * 
     * Response Codes:
     * - 200: Route calculated successfully
     * - 400: Missing required parameters
     * - 404: Route not found
     * - 500: Server error
     * 
     * Example Request:
     * GET /api/route?departureStation=Amsterdam&arrivalStation=Rotterdam
     */
    router.get('/route', async (
        req: Request<{}, {}, {}, RouteRequest>, 
        res: Response<Route | ApiError>
    ) => {
        try {
            const routeData = await routeService.getRouteData(req.query);
            res.json(routeData);
        } catch (error) {
            if (error instanceof ValidationError) {
                // 400 voor validatiefouten (bijvoorbeeld dezelfde stations)
                res.status(400).json({ error: error.message });
                return;
            }
            
            if (error instanceof RouteNotFoundError) {
                // 404 voor niet-gevonden routes (voor toekomstige use cases)
                res.status(404).json({ error: error.message });
                return;
            }
            // 500 voor onverwachte fouten
            res.status(500).json({ 
                error: 'Er is een onverwachte fout opgetreden bij het ophalen van de routegegevens' 
            });
        }
    });

    return router;
};