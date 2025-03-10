// api.ts
import express, { Request, Response } from 'express';
import { Station, Route, ApiError, RouteRequest } from '../shared/types';
import { stationService } from './services/stationService';
import { routeService } from './services/routeService';
import { RouteNotFoundError } from './services/routeService';
import { ValidationError } from './services/routeValidator';
import { ovRepository } from './ovRepository';

/**
* Creates an Express router with all API endpoints
 */

export const api = () => {
    const router = express.Router();

    /**
     * Retrieves all available train stations
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
     * Check if a route between two stations is possible and return the route or an error
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
            ovRepository.getAllSchedulesByDate("2025-03-10");
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
     * Searches stations based on query
     */
     router.get('/stations/search', async (req: Request, res: Response<Station[] | { error: string }>) => {
        try {
            // Get the query parameter from the request object
            const query = req.query.query as string;
            
            console.log("Ontvangen zoekquery:", query);
    
            // cheks if there is a query
            if (!query) {
                return res.status(400).json({ error: 'Geen zoekterm opgegeven' });
            }
    
            // looks for stations based on the query
            const stations = await stationService.searchStations(query);
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