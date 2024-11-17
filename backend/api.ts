// api.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { getStations } from './database/db';
import { generateRoute } from './services/routeService';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/stations', async (req: Request, res: Response) => {
    try {
        const stations = await getStations();
        console.log('Number of stations:', stations.length);
        res.json(stations);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching stations from database' });
    }
});

app.get('/route', async (req: Request, res: Response) => {
    try {
        const departureStation = req.query.departureStation as string;
        const arrivalStation = req.query.arrivalStation as string;

        if (!departureStation || !arrivalStation) {
            return res.status(400).json({ error: 'Vertrek- en aankomststation zijn verplicht.' });
        }

        const route = await generateRoute(departureStation, arrivalStation);
        res.json(route);
    } catch (error) {
        console.error('Route generation error:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het genereren van de route.' });
    }
});

const PORT: number = 4010;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});