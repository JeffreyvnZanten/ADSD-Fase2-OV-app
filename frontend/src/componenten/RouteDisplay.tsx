import React from 'react';
import MessageDisplay from './MessageDisplay';
import { Route } from '../../../shared/types';


interface RouteDisplayProps {
    route: Route;
}

// Generate the message with the route in a specific format
const formatRouteMessage = (route: Route): string => {
    const steps = route.steps.map((step, index) => `Stap ${index + 1}: ${step}`);
    return `Route van ${route.departure} naar ${route.arrival}. ${steps.join('. ')}`;
};

// This component is used to display the route to the user.
export default function RouteDisplay({ route }: RouteDisplayProps) {
    const message = formatRouteMessage(route);
    
    return (
        <MessageDisplay
            content={message}
            type="route"
        />
    );
}