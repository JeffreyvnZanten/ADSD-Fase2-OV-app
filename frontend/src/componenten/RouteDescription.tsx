// RouteDescription.tsx
import React from 'react';
import { Route } from '../../../backend/types';

/**
 * Route Description Component
 * 
 * This component displays the calculated route between two stations.
 * It shows step-by-step instructions for travelers to follow.
 * 
 * Key Concepts:
 * - Conditional Rendering: Component only shows when there's a route
 * - Ordered Lists: Using <ol> for sequential steps
 * - Type Safety: Using TypeScript interfaces for props
 * 
 * Example Usage:
 * <RouteDescription route={{
 *   departure: "Amsterdam",
 *   arrival: "Rotterdam",
 *   steps: ["Go to platform 3", "Take train", "Exit at north"]
 * }} />
 */

/**
 * Props Interface
 * Defines what properties must be passed to this component
 */
interface RouteDescriptionProps {
    /** 
     * The route to display
     * Can be null when no route is selected yet
     * When provided, must contain departure, arrival, and steps
     */
    route: Route | null;
}

/**
 * Route Description Component
 * 
 * @param props - Component properties (see RouteDescriptionProps interface)
 * @returns JSX element with route information or null if no route
 * 
 * Implementation Details:
 * 1. First checks if route exists and has steps
 * 2. If no route, returns null (component won't render)
 * 3. If route exists:
 *    - Shows header with departure and arrival stations
 *    - Displays numbered list of steps to follow
 * 4. Each step gets a unique key for React's rendering optimization
 */
export default function RouteDescription({ route }: RouteDescriptionProps) {
    // Early return if no route or steps are available
    if (!route || !route.steps) return null;

    return (
        <div className="route">
            {/* Header showing the route endpoints */}
            <h2>Route van {route.departure} naar {route.arrival}:</h2>
            
            {/* Ordered list for step-by-step instructions */}
            <ol>
                {/* Map each step to a list item */}
                {route.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}