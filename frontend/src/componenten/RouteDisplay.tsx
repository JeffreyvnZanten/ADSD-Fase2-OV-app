import React from 'react';
import MessageDisplay from './MessageDisplay';
import { Route } from '../../../backend/types';

// Define the props for the RouteDisplay component
interface RouteDisplayProps {
    route: Route;
}

// Generate the route in a specific format
const formatRouteMessage = (route: Route): string => {
    const steps = route.steps.map((step, index) => `Stap ${index + 1}: ${step}`);
    return `Route van ${route.departure} naar ${route.arrival}. ${steps.join('. ')}`;
};

// Define the RouteDisplay component
export default function RouteDisplay({ route }: RouteDisplayProps) {
    const message = formatRouteMessage(route);
    
    return (
        <MessageDisplay
            content={message}
            type="route"
        />
    );
}