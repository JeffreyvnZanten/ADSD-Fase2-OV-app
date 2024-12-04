import React from 'react';
import MessageDisplay from './MessageDisplay';

// Define Route type if not imported
interface Route {
    departure: string;
    arrival: string;
    steps: string[];
}

interface RouteDisplayProps {
    /** Route object containing departure, arrival, and navigation steps */
    route: Route;
}

/**
 * Converts a Route object into a human-readable string format
 */
const formatRouteMessage = (route: Route): string => {
    const steps = route.steps.map((step, index) => `Stap ${index + 1}: ${step}`);
    return `Route van ${route.departure} naar ${route.arrival}. ${steps.join('. ')}`;
};

/**
 * Component for displaying navigation routes in a consistent format
 */
export default function RouteDisplay({ 
    route 
}: RouteDisplayProps) {
    const message = formatRouteMessage(route);

    return (
        <MessageDisplay
            content={message}
            type="route"
            role="status"
        />
    );
}