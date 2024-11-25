/**
 * Station Selection Component
 * 
 * This component creates a dropdown menu for selecting train stations.
 * It's used for both departure and arrival station selection.
 * 
 * Key Concepts:
 * - Props: Properties passed to the component to configure its behavior
 * - Event Handling: Managing user interactions with the dropdown
 * - Accessibility: Support for keyboard navigation and screen readers
 * 
 * Example Usage:
 * <StationSelector
 *   label="Departure Station"
 *   value={selectedStation}
 *   stations={availableStations}
 *   onChange={handleChange}
 *   tabindex={1}
 * />
 */

import React from 'react';
import { Station } from '../../../backend/types';

/**
 * Props Interface
 * Defines the properties that must be passed to this component
 */
interface StationSelectorProps {
    /** Text label shown above the dropdown (e.g., "Departure Station") */
    label: string;
    /** Currently selected station value */
    value: string;
    /** Array of all available stations to choose from */
    stations: Station[];
    /** Function to call when user selects a different station */
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    /** Tab order for keyboard navigation (accessibility feature) */
    tabindex: number;
}

/**
 * Station Selection Component
 * 
 * @param props - Component properties (see StationSelectorProps interface)
 * @returns A styled dropdown menu for station selection
 * 
 * Implementation Details:
 * 1. Creates a wrapper div with 'downunder' class for styling
 * 2. Includes a label for screen readers and visual users
 * 3. Renders a select element with:
 *    - Default "Select station" option
 *    - List of all available stations
 * 4. Handles keyboard navigation via tabIndex
 */
export default function StationSelector({ 
    label, 
    value, 
    stations, 
    onChange,
    tabindex
}: StationSelectorProps) {
    return (
        <div className='downunder'>
            {/* Label for accessibility and visual clarity */}
            <label>{label}:</label>
            
            {/* Dropdown menu with stations */}
            <select 
                tabIndex={tabindex} 
                value={value} 
                onChange={onChange}
            >
                {/* Default option */}
                <option value="">
                    -- Selecteer {label.toLowerCase()} --
                </option>
                
                {/* Map through all stations to create options */}
                {stations.map((station) => (
                    <option 
                        key={station.id} 
                        value={station.city}
                    >
                        {station.city}
                    </option>
                ))}
            </select>
        </div>
    );
}