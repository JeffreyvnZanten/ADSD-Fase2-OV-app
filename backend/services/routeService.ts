// services/routeService.ts
import { Route, Station } from '../types/types';
import { getStations } from '../database/db';

export async function generateRoute(departureStationName: string, arrivalStationName: string): Promise<Route> {
    const stations = await getStations();
    const departure = stations.find(s => s.name === departureStationName);
    const arrival = stations.find(s => s.name === arrivalStationName);

    // Validate stations exist
    if (!departure || !arrival) {
        throw new Error('Beide stations moeten geldig zijn.');
    }

    // Validate stations are different
    if (departure.name === arrival.name) {
        throw new Error('Vertrek- en aankomststation moeten verschillend zijn.');
    }

    return {
        departure: departure.name,
        arrival: arrival.name,
        steps: [
            `Ga naar ${departure.platform} bij ${departure.name}.`,
            `Neem de trein naar ${arrival.name}.`,
            `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
        ]
    };
}