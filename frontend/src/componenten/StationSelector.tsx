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

import React, { useRef } from 'react';
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
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Stop eerst eventuele lopende screen reader aankondigingen
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        // Roep direct de onChange aan zodat de selectie meteen wordt verwerkt
        onChange(event);

        // Als we extra handelingen willen doen voor de screen reader, 
        // kunnen we die in de timeout plaatsen
        setTimeout(() => {
            // Hier kunnen we extra screen reader logica toevoegen indien nodig
            if (selectRef.current) {
                // Bijvoorbeeld een extra aria-live update
                selectRef.current.setAttribute('aria-live', 'off');
                setTimeout(() => {
                    selectRef.current?.setAttribute('aria-live', 'polite');
                }, 50);
            }
        }, 100);
    };

    return (
        <div className='downunder'>
            <label htmlFor={`station-${label}`}>{label}:</label>
            
            <select 
                ref={selectRef}
                id={`station-${label}`}
                tabIndex={tabindex} 
                value={value} 
                onChange={handleChange}
                aria-label={`Kies ${label.toLowerCase()}`}
                aria-live="polite"
                aria-atomic="true"
            >
                <option 
                    value="" 
                    role="option"
                    aria-label={`Selecteer ${label.toLowerCase()}`}
                >
                    -- Selecteer {label.toLowerCase()} --
                </option>
                
                {stations.map((station) => (
                    <option 
                        key={station.id} 
                        value={station.city}
                        role="option"
                        aria-label={station.city}
                    >
                        {station.city}
                    </option>
                ))}
            </select>
        </div>
    );
}