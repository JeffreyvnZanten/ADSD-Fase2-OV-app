/**
 * Custom hook for managing OV application state and logic
 * Contains all state management and handlers for the station selection and route generation
 */

import { useState, useEffect } from 'react';
import { Station, Route } from '../../../backend/types';
import { speak } from './useSpeak';

const API_BASE_URL = 'http://localhost:4010/api';

/**
 * Hook for managing OV application state and operations
 * @returns {Object} Object containing state and handler functions
 */
function useOvApp() {
    /** State for storing all available stations */
    const [stations, setStations] = useState<Station[]>([]);
    /** State for storing selected departure station */
    const [departureStation, setDepartureStation] = useState('');
    /** State for storing selected arrival station */
    const [arrivalStation, setArrivalStation] = useState('');
    /** State for storing calculated route */
    const [route, setRoute] = useState<Route | null>(null);

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
        speak(`Vertrekstation is ingesteld op ${selectedCity}`);
    }
    
    /**
     * Handles arrival station selection change
     * @param {Event} event - Change event from select element
     */
    function handleArrivalChange(event: { target: { value: string } }) {
        const selectedCity = event.target.value;
        setArrivalStation(selectedCity);
        speak(`Aankomststation is ingesteld op ${selectedCity}`);
    }

    /**
     * Handles route generation request
     * Fetches and sets the route between selected stations
     */
    const handleGetRoute = async () => {
        if (!departureStation || !arrivalStation) {
            speak('Selecteer eerst een vertrek- en aankomststad');
            return;
        }
     
        try {
            const queryParams = new URLSearchParams({
                departureStation,
                arrivalStation
            });
     
            const response = await fetch(`${API_BASE_URL}/route?${queryParams}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Route kon niet worden opgehaald');
            }
     
            const data: Route = await response.json();
            setRoute(data);
            speak(`De route van ${data.departure} naar ${data.arrival} is gegenereerd. ${data.steps.join(', ')}`);
        } catch (error) {
            console.error('Error fetching route:', error);
            speak('Er is een fout opgetreden bij het ophalen van de route. Controleer of je geldige steden hebt geselecteerd.');
            setRoute(null);
        }
    };

    /**
     * Resets all form fields and route data
     */
    function handleReset() {
        setDepartureStation('');
        setArrivalStation('');
        setRoute(null);
        speak('De selectie is gereset');
    }

    return {
        stations,
        departureStation,
        arrivalStation,
        route,
        handleDepartureChange,
        handleArrivalChange,
        handleGetRoute,
        handleReset
    };
}

export default useOvApp;