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
 *   onChange={handleQueryFilter}
 *   tabindex={1}
 * />
 */

import React, { useState } from 'react';
import { Station } from '../../../shared/types';
import { API_BASE_URL } from '../constants/urls';

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
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
}: Readonly<StationSelectorProps>) {

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Filter stations based on stations array
    const handleLocalFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        onChange(event);

        // Filter stations based on input
        const filteredSuggestions = stations
            .filter(station => station.city.toLowerCase().includes(inputValue.toLowerCase()))
            .map(station => station.city);

        // Put it in a list of suggestions to show when typing
        setSuggestions(filteredSuggestions);
    }; 

    // Query and filter stations based on input
    const handleQueryFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        onChange(event);
    
        try {
            // API endpoint to search for stations by query
            const response = await fetch(
                `${API_BASE_URL}/stations/search?query=${encodeURIComponent(inputValue)}`
            );
    
            if (!response.ok) {
                throw new Error('Search failed');
            }
    
            // Put in an array of Station objects
            const stations: Station[] = await response.json(); 
            
            // Filter stations op basis van de input
            const filteredSuggestions = stations
                .filter(station => station.city.toLowerCase().includes(inputValue.toLowerCase()))
                .map(station => station.city);
                
            // Put it in a list of suggestions to show when typing
            setSuggestions(filteredSuggestions);
            
        } catch (err) {
            setError('Failed to fetch suggestions');
            setSuggestions([]);
        }
    };

    // Renders the HTML and data of this component
    return (
        <div className='downunder'>
            <label htmlFor={label}>{label}:</label>
            <input 
                type="text" 
                id={label}
                tabIndex={tabindex} 
                value={value} 
                onChange={handleQueryFilter}
                list={`${label}-suggestions`} 
            />
            <datalist id={`${label}-suggestions`}>
                {suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                ))}
            </datalist>
        </div>
    );
}