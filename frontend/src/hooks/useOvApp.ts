/**
 * Custom hook for managing OV application state and logic
 * Contains all state management and handlers for the station selection and route generation
 */

import { useState, useEffect } from 'react';
import { Station, Route } from '../../../shared/types';
import { API_BASE_URL } from '../constants/urls';

/**
 * Hook for managing OV application state and operations
 * @returns {Object} Object containing state and handler functions
 */
function useOvApp() {
    // State for storing all available stations 
    const [stations, setStations] = useState<Station[]>([]);
    // State for storing selected departure station 
    const [departureStation, setDepartureStation] = useState('');
    // State for storing selected arrival station 
    const [arrivalStation, setArrivalStation] = useState('');
    // State for storing calculated route 
    const [route, setRoute] = useState<Route | null>(null);
    // 
    const [error, setError] = useState<string | null>(null);

    /** Fetch all stations on component mount */
    useEffect(() => {
        console.log('Fetching stations...');
        fetch(`${API_BASE_URL}/stations`)
            .then((response) => {
                console.log('Response received:', response.status);
                return response.json();
            })
            .then((data: Station[]) => {
                console.log('Stations data received:', data);
                setStations(data);
            })
            .catch((error) => {
                console.error('Error fetching stations:', error);
            });
    }, []);

    /**
     * Handles departure station selection change
     * @param {Event} event - Change event from select element
     */
    function handleDepartureChange(event: { target: { value: string } }) {
        const selectedCity = event.target.value;
        setDepartureStation(selectedCity);
        //speak(`Vertrekstation is ingesteld op ${selectedCity}`);
    }
    
    /**
     * Handles arrival station selection change
     * @param {Event} event - Change event from select element
     */
    function handleArrivalChange(event: { target: { value: string } }) {
        const selectedCity = event.target.value;
        setArrivalStation(selectedCity);
        //speak(`Aankomststation is ingesteld op ${selectedCity}`);
    }

    /**
     * Fetches a route between selected stations and updates application state
     * 
     * Makes an API call to retrieve route information based on departure and arrival stations.
     * Handles success by updating route state and error cases by setting appropriate error messages.
     * 
     * @async
     * @function handleGetRoute
     * @throws {Error} When API request fails or returns an error response
     * 
     */
    const handleGetRoute = async () => {
        setError(null);
        handleReset();
    
        try {
            const queryParams = new URLSearchParams({
                departureStation,
                arrivalStation
            });
     
            const response = await fetch(`${API_BASE_URL}/route?${queryParams}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error); 
                return; 
            }
     
            const data: Route = await response.json();
            setRoute(data);
        } catch (error) {
            console.error('Error fetching route:', error);
            setError('Er is een fout opgetreden bij het ophalen van de route');
            setRoute(null);
        }
    };

    /**
     * Resets all form fields and route data
     */
    function handleReset() {
        setDepartureStation('');
        setArrivalStation('');
        setError(null);
        setRoute(null);
    }

    return {
        stations,
        departureStation,
        arrivalStation,
        route,
        handleDepartureChange,
        handleArrivalChange,
        handleGetRoute,
        handleReset,
        error
    };
}

export default useOvApp;