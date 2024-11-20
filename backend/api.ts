// api.ts
import express, { Request, Response } from 'express';
import { Database } from 'sqlite3';
import { Station, Route, ApiError, RouteRequest } from './types';
import { stationService } from './services/stationService';
import { routeService } from './services/routeService';

export const createApi = (db: Database) => {
    const router = express.Router();

    router.get('/stations', async (_req: Request, res: Response<Station[] | ApiError>) => {
        try {
            const stations = await stationService.getAllStations(db);
            res.json(stations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stations' });
        }
    });

    router.get('/stations/:city', async (req: Request, res: Response<Station[] | ApiError>) => {
        try {
            const stations = await stationService.getStationsByCity(db, req.params.city);
            if (stations.length === 0) {
                res.status(404).json({ error: 'No stations found for this city' });
                return;
            }
            res.json(stations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stations' });
        }
    });

    router.get('/route', async (
        req: Request<{}, {}, {}, RouteRequest>, 
        res: Response<Route | ApiError>
    ) => {
        const { departureStation, arrivalStation } = req.query;
    
        if (!departureStation || !arrivalStation) {
            res.status(400).json({ 
                error: 'Missing departure or arrival city' 
            });
            return;
        }
    
        try {
            const route = await routeService.calculateRoute(db, {
                departureStation,
                arrivalStation
            });
    
            if (!route) {
                res.status(404).json({ 
                    error: 'Could not find route between cities' 
                });
                return;
            }
    
            res.json(route);
        } catch (error) {
            res.status(500).json({ error: 'Failed to calculate route' });
        }
    });

    return router;
};