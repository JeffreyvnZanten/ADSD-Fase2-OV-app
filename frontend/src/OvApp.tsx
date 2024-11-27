/**
 * Main OV (Public Transport) Application Component
 * 
 * This is the top-level component that combines all other components and functionality.
 * It provides a user interface for selecting stations and viewing travel routes,
 * with special focus on accessibility for visually impaired users.
 * 
 * Key Concepts:
 * - Custom Hooks: Uses useOvApp for state management
 * - Accessibility: Built-in screen reader support
 * - Component Composition: Combines multiple smaller components
 * - useRef & useEffect: For managing one-time audio introduction
 * 
 * Component Structure:
 * - Header
 * - Departure Station Selector
 * - Arrival Station Selector
 * - Action Buttons (Generate Route & Reset)
 * - Route Description (when available)
 */

import React, { useRef, useEffect } from 'react';
import useOvApp from './hooks/useOvApp'; 
import StationSelector from './componenten/StationSelector';
import RouteDescription from './componenten/RouteDescription';
import { speak } from './hooks/useSpeak';
import './styles/tab.css';

/**
 * Main Application Component
 * 
 * @returns {JSX.Element} The complete OV application interface
 * 
 * Implementation Details:
 * 1. Uses useOvApp hook for all state management and handlers
 * 2. Plays introduction audio for first-time visitors
 * 3. Renders station selectors and route information
 * 4. Provides keyboard navigation support
 */
function OVApp() {
    // Get all state and handlers from our custom hook
    const {
        stations,          // List of all available stations
        route,            // Current route (if calculated)
        handleGetRoute,         // Handler for route generation
        handleReset            // Handler for form reset
    } = useOvApp(); 

    // State variables for departure and arrival stations and their suggestions
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);   


    // Ref to track if intro audio has been played
    const hasPlayedRef = useRef(false);
    
    // Accessibility introduction message
    const intro = "Deze website is geoptimaliseerd voor blinde mensen. "
        + "Je kan het volgende element selecteren met de tab-toets en teruggaan met shift-tab. "
        + "Met enter selecteer je een element. En met f7 hoor je deze instructies opnieuw.";
  
    // Play introduction audio once when component mounts
    useEffect(() => {
        if (!hasPlayedRef.current) {
            speak(intro);
            hasPlayedRef.current = true;
        }
    }, []); // Empty dependency array means this runs once on mount

    // Handler for departure station input change
    const handleDepartureChange = (event) => {
        const inputValue = event.target.value;
        setDepartureStation(inputValue);

        // Filter stations based on input
        const filteredStations = stations.filter(station =>
            station.toLowerCase().includes(inputValue.toLowerCase())
        );
        setDepartureSuggestions(filteredStations);
    };

    // Handler for arrival station input change
    const handleArrivalChange = (event) => {
        const inputValue = event.target.value;
        setArrivalStation(inputValue);

        // Filter stations based on input
        const filteredStations = stations.filter(station =>
            station.toLowerCase().includes(inputValue.toLowerCase())
        );
        setArrivalSuggestions(filteredStations);
    };

    // Handler for clicking a departure suggestion
    const handleDepartureSuggestionClick = (station) => {
        setDepartureStation(station);
        setDepartureSuggestions([]); // Clear suggestions
    };

    // Handler for clicking an arrival suggestion
    const handleArrivalSuggestionClick = (station) => {
        setArrivalStation(station);
        setArrivalSuggestions([]); // Clear suggestions
    };

    return (
        <div className='box-1'>
            {/* Main application title */}
            <h1>OV Stations Selector</h1>

            {/* Departure station input with suggestions */}
            <div>
                <label htmlFor="departure">Vertrekstation:</label>
                <input 
                    type="text" 
                    id="departure" 
                    value={departureStation} 
                    onChange={handleDepartureChange} 
                    tabIndex={0} 
                />
                <ul>
                    {departureSuggestions.map(station => (
                        <li 
                            key={station} 
                            onClick={() => handleDepartureSuggestionClick(station)}
                        >
                            {station}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Arrival station input with suggestions */}
            <div>
                <label htmlFor="arrival">Aankomststation:</label>
                <input 
                    type="text" 
                    id="arrival" 
                    value={arrivalStation} 
                    onChange={handleArrivalChange} 
                    tabIndex={0} 
                />
                <ul>
                    {arrivalSuggestions.map(station => (
                        <li 
                            key={station} 
                            onClick={() => handleArrivalSuggestionClick(station)}
                        >
                            {station}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action buttons container */}
            <div className='button-wrapper'>
                {/* Generate route button */}
                <button 
                    tabIndex={0} 
                    onClick={() => handleGetRoute(departureStation, arrivalStation)} 
                >
                    Genereer Route
                </button>

                {/* Reset form button */}
                <button onClick={handleReset}>
                    Reset
                </button>
            </div>

            {/* Conditional rendering of route information */}
            {route && <RouteDescription route={route} />}
        </div>
    );
}

export default OVApp;