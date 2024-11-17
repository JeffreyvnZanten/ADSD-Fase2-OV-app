// RouteDescription.tsx
import React from 'react';
import { Route } from '../../../backend/types/types';

interface RouteDescriptionProps {
    route: Route | null;
}

export default function RouteDescription({ route }: RouteDescriptionProps) {
    if (!route) return null;

    return (
        <div className="route">
            <h2>Route van {route.departure} naar {route.arrival}:</h2>
            <ol>
                {route.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}