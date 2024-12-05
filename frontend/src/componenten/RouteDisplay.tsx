import React from 'react';
import MessageDisplay from './MessageDisplay';

interface Route {
    departure: string;
    arrival: string;
    steps: string[];
}

interface RouteDisplayProps {
    route: Route;
}

const formatRouteMessage = (route: Route): string => {
    const steps = route.steps.map((step, index) => `Stap ${index + 1}: ${step}`);
    return `Route van ${route.departure} naar ${route.arrival}. ${steps.join('. ')}`;
};

export default function RouteDisplay({ route }: RouteDisplayProps) {
    const message = formatRouteMessage(route);
    
    return (
        <MessageDisplay
            content={message}
            type="route"
        />
    );
}