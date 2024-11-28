// RouteDisplay.tsx
import React from 'react';
import MessageDisplay from './MessageDisplay';
import { Route } from '../../../backend/types';

interface RouteDisplayProps {
    /** Route object containing departure, arrival, and navigation steps */
    route: Route;
}

/**
 * Converts a Route object into a human-readable string format
 * Combines departure, arrival, and numbered steps into a single formatted message
 * 
 * @param route - Route object containing journey details
 * @returns Formatted string with complete route information
 * 
 * @example
 * const route = {
 *   departure: "Amsterdam",
 *   arrival: "Rotterdam",
 *   steps: ["Take train", "Walk to exit"]
 * };
 * // Returns: "Route van Amsterdam naar Rotterdam. Stap 1: Take train. Stap 2: Walk to exit"
 */
const formatRouteMessage = (route: Route): string => {
    const steps = route.steps.map((step, index) => `Stap ${index + 1}: ${step}`);
    return `Route van ${route.departure} naar ${route.arrival}. ${steps.join('. ')}`;
};

/**
 * Component for displaying navigation routes in a consistent format
 * Wraps MessageDisplay component with route-specific formatting
 * 
 * @component
 * @param props - Component props
 * @param props.route - Route object containing journey information
 * 
 * @example
 * const route = {
 *   departure: "Amsterdam",
 *   arrival: "Rotterdam",
 *   steps: ["Take train", "Walk to exit"]
 * };
 * 
 * <RouteDisplay route={route} />
 */
export default function RouteDisplay({ 
    route 
}: RouteDisplayProps) {
    const message = formatRouteMessage(route);

    return (
        <MessageDisplay
            content={message}
            type="route"  
        />
    );
}