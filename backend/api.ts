import express, { Request, Response } from 'express';
import cors from 'cors';
import { client, initializeDatabase } from './database/db';

const app = express();
app.use(cors());
app.use(express.json());

// Blueprint voor de data van de station entiteit
// export zodat het gebruikt kan worden in andere bestanden
export interface Station {
    id: number;
    name: string;
    code: string;
    city: string;
    platform: string;
    exit: string;
}

// Blueprint voor de data van de routeverzoek entiteit
// export zodat het gebruikt kan worden in andere bestanden
export interface RouteRequest {
    departureStation: string;
    arrivalStation: string;
}

// Blueprint voor de data van de route entiteit
// export zodat het gebruikt kan worden in andere bestanden
export interface Route {
    departure: string;
    arrival: string;
    steps: string[];
}

// Wordt gebruikt om Station objecten te maken op basis van de velden in de database
function createStationFromRow(row: any): Station {
    return {
        id: row.id,
        name: row.name,
        code: row.code,
        city: row.city,
        platform: row.platform,
        exit: row.exit
    };
}

// Oude rauwe data als array
// const stations: Station[] = [
//     { id: 1, name: 'Station Amsterdam Centraal', code: 'AMS', city: 'Amsterdam', platform: 'Perron 5', exit: 'Hoofduitgang' },
//     { id: 2, name: 'Station Rotterdam Centraal', code: 'RTD', city: 'Rotterdam', platform: 'Perron 3', exit: 'Noorduitgang' },
//     { id: 3, name: 'Station Utrecht Centraal', code: 'UTC', city: 'Utrecht', platform: 'Perron 12', exit: 'Zuiduitgang' },
//     { id: 4, name: 'Station Den Haag Centraal', code: 'DHG', city: 'Den Haag', platform: 'Perron 7', exit: 'Westuitgang' },
//     { id: 5, name: 'Station Eindhoven Centraal', code: 'EHV', city: 'Eindhoven', platform: 'Perron 2', exit: 'Oostuitgang' },
//     { id: 6, name: 'Station Arnhem Centraal', code: 'ARN', city: 'Arnhem', platform: 'Perron 1', exit: 'Hoofduitgang' }
// ];

// Nieuwe implementatie van stations krijgen op basis query met de database
app.get('/stations', async (req: Request, res: Response) => {
    try {
        // First check if table exists
        const tableCheck = await client.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'"
        );
        console.log('Table check:', tableCheck.rows);

        const stations = await client.execute('SELECT * FROM stations');
        console.log('Database query result:', stations.rows);
        console.log('Number of stations:', stations.rows.length);
        
        if (stations.rows.length === 0) {
            // Voor debug: laat de tabelstructuur zien
            const tableInfo = await client.execute('SELECT sql FROM sqlite_master WHERE type="table" AND name="stations"');
            console.log('Table structure:', tableInfo.rows);
        }
        
        res.json(stations.rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching stations from database' });
    }
});

// Nieuwe implementatie van route krijgen op basis query met de database
app.post('/route', async (req: Request<{}, {}, RouteRequest>, res: Response) => {
    try {
        const { departureStation, arrivalStation } = req.body;

        const stationResults = await Promise.all([
            client.execute({
                sql: 'SELECT * FROM stations WHERE name = ?',
                args: [departureStation]
            }),
            client.execute({
                sql: 'SELECT * FROM stations WHERE name = ?',
                args: [arrivalStation]
            })
        ]);

        if (!stationResults[0].rows[0] || !stationResults[1].rows[0]) {
            return res.status(400).json({ error: 'Beide stations moeten geldig zijn.' });
        }

        const [departure, arrival] = stationResults.map(result => 
            createStationFromRow(result.rows[0])
        );

        if (departure.name === arrival.name) {
            return res.status(400).json({ error: 'Vertrek- en aankomststation moeten verschillend zijn.' });
        }

        const route: Route = {
            departure: departure.name,
            arrival: arrival.name,
            steps: [
                `Ga naar ${departure.platform} bij ${departure.name}.`,
                `Neem de trein naar ${arrival.name}.`,
                `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
            ]
        };

        res.json(route);
    } catch (error) {
        res.status(500).json({ error: 'Error processing route request' });
    }
});

// app.get('/', (req: Request, res: Response) => {
//     res.send('Welkom bij de OV API! Ga naar /stations voor stationsinformatie.');
// });

// app.get('/stations', (req: Request, res: Response) => {
//     res.json(stations);
// });

// app.post('/route', (req: Request<{}, {}, RouteRequest>, res: Response) => {
//     const { departureStation, arrivalStation } = req.body;
//     const departure = stations.find(station => station.name === departureStation);
//     const arrival = stations.find(station => station.name === arrivalStation);

//     if (!departure || !arrival) {
//         return res.status(400).json({ error: 'Beide stations moeten geldig zijn.' });
//     }

//     if (departure.name === arrival.name) {
//         return res.status(400).json({ error: 'Vertrek- en aankomststation moeten verschillend zijn.' });
//     }

//     const route: Route = {
//         departure: departure.name,
//         arrival: arrival.name,
//         steps: [
//             `Ga naar ${departure.platform} bij ${departure.name}.`,
//             `Neem de trein naar ${arrival.name}.`,
//             `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
//         ]
//     };

//     res.json(route);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const PORT: number = 4010;

// Initialize database before starting the server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
});