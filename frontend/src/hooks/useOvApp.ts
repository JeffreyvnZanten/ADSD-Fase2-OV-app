import { useState, useEffect } from 'react';
import { Station, Route } from '../../../backend/types';
import { speak } from './useSpeak';

const API_BASE_URL = 'http://localhost:4010/api';

function useOvApp() {
    // Alle variabelen en functies op de React manier die nodig zijn om een reisadvies te 
    // genereren op basis van een vertrek en aankomststation
    const [stations, setStations] = useState<Station[]>([]);
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [route, setRoute] = useState<Route | null>(null);

    // Deze callback van React haalt de data op uit de API (nu nog array)
    // en zet deze in het de stations variabele
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

    // Zet de gekozen string in een variable en zet die als vertrekstation
    // Gebruik de TTS met het geselecteerde station
    function handleDepartureChange(event: { target: { value: string } }) {
        const selectedCity = event.target.value;
        setDepartureStation(selectedCity);
        speak(`Vertrekstation is ingesteld op ${selectedCity}`);
    }
    
    // Zet de gekozen string in een variable en zet die als aankomststation
    // Gebruik de TTS met het geselecteerde station
    function handleArrivalChange(event: { target: { value: string } }) {
        const selectedCity = event.target.value;
        setArrivalStation(selectedCity);
        speak(`Aankomststation is ingesteld op ${selectedCity}`);
    }

    // Als het vertrek en aankomst station zijn gekozen haalt de app de data op uit de API
    // Vervolgens wordt de route geupdate met de useState callback van route, wat ervoor zorgt dat
    //  de data wordt getoond in de UI element
    // In useOvApp.ts
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
    // functie om de velden te resetten naar de standaard waardes
    function handleReset() {
        setDepartureStation('');
        setArrivalStation('');
        setRoute(null);
        speak('De selectie is gereset');
    }

    // // functie om een string om te zetten met TTS naar spraak
    // function speak(text: string) {
    //     const utterance = new SpeechSynthesisUtterance(text);
    //     utterance.lang = 'nl-NL';
    //     window.speechSynthesis.speak(utterance);
    // }

    // Dit zorgt ervoor dat alle data bruikbaar is in andere bestanden en geeft alle deze data mee. 
    // De variabelen en functies. dmv van = useOvApp te gebruiken

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