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
     * GET /api/route
     * Calculates a route between two stations
     * 
     * Query Parameters:
     * - departureStation: Name of departure city
     * - arrivalStation: Name of arrival city
     * 
     * Response Codes:
     * - 200: Route calculated successfully
     * - 400: Missing required parameters
     * - 404: Route not found
     * - 500: Server error
     * 
     * Example Request:
     * GET localhost:4010/api/route?departureStation=Amsterdam&arrivalStation=Rotterdam
     */
    
    router.get('/route', async (
        req: Request<{}, {}, {}, RouteRequest>, 
        res: Response<Route | ApiError>
    ) => {
        const { departureStation, arrivalStation } = req.query;
    
        try {
            const route = await routeService.calculateRoute({
                departureStation,
                arrivalStation
            });
            res.json(route);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
                return;
            }
            if (error instanceof RouteNotFoundError) {
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Er is een fout opgetreden bij het berekenen van de route' });
        }
    });

     /**
     * GET /api/stations/search 
     * Searches stations based on query
     * 
     * @param query - The query (2 characters minimum)
     * @returns Filtered list of stations
     */
     router.get('/stations/search', async (req: Request, res: Response<Station[] | { error: string }>) => {
        try {
            // Get the query parameter from the request object
            const query = req.query.query as string;
            
            // inject the logging to see what we receive
            console.log("Ontvangen zoekquery:", query);
    
            // cheks if there is a query
            if (!query) {
                return res.status(400).json({ error: 'Geen zoekterm opgegeven' });
            }
    
            // looks for stations based on the query
            const stations = await stationService.searchStations(query);
            
            // shows the result in the console 
            console.log("Gevonden stations:", stations);
    
            // Send the result back as an array of stations
            return res.json(stations);
        } catch (error) {
            console.error("Error tijdens zoeken:", error);
            // sends an error object back
            return res.status(500).json({ error: 'Er is een fout opgetreden tijdens het zoeken' });
        }
    });

    return router;
};