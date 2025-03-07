/**
 * Main OV (Public Transport) Application Component
 * 
 * This is the top-level component that combines all other components and functionality.
 * It provides a user interface for selecting stations and viewing travel routes,
 * with special focus on accessibility for visually impaired users.
 * 
 */

import React, { useState ,useRef, useEffect } from 'react';
import useOvApp from './hooks/useOvApp'; 
import StationSelector from './componenten/StationSelector';
import RouteDisplay from './componenten/RouteDisplay';
import ErrorDisplay from './componenten/ErrorDisplay';
import './styles/tab.css';
import DateAndTime from './componenten/DateAndTIme';

// Main Application Component
function OVApp() {
    // Get all state and handlers from our custom hook
    const {
        stations,          
        departureStation,  
        arrivalStation,   
        route,           
        error,
        handleDepartureChange,  
        handleArrivalChange,    
        handleGetRoute,         
        handleReset            
    } = useOvApp(); 
    
    // Ref to track if intro audio has been played
    const hasPlayedRef = useRef(false);
    
    // Accessibility introduction message
    const intro = "Deze website is geoptimaliseerd voor blinde mensen.   Je kan het volgende element selecteren met de tab-toets en teruggaan met shift-tab.   Met enter selecteer je een element. En met f7 hoor je deze instructies opnieuw.";
  
    // Play introduction audio once when component mounts
    useEffect(() => {
        if (!hasPlayedRef.current) {
            hasPlayedRef.current = true;
        }
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className='box-1'>
            {/* Main application title */}
            <h1   tabIndex={1} aria-label='"Deze website is geoptimaliseerd voor blinde mensen. Je kan het volgende element selecteren met de tab-toets en teruggaan met shift-tab.  Met enter selecteer je een element";'>OV Stations Selector</h1>
            <p  tabIndex={1}   aria-label="Waneer je het station aan het invoeren bent zal er een uitklap menu komen waar je met de pijltoesten door heen kan en met enter kan selecteren"></p>
            {/* Departure station dropdown */}
            <StationSelector
                label="Vertrekstation: voer hier je station in"
                value={departureStation}
                stations={stations}
                onChange={handleDepartureChange} 
                tabindex={0}
            />
            
            {/* Arrival station dropdown */}
            <StationSelector
                label="Aankomststation: voer hier je station in"
                value={arrivalStation}
                stations={stations}
                onChange={handleArrivalChange}
                tabindex={0}
            />

            <DateAndTime 
                onDateTimeChange={(date) => {
                    console.log("Selected date:", date);
                }} 
            />

            {/* Action buttons container */}
            <div className='button-wrapper'>
                {/* Generate route button */}
                <button 
                    tabIndex={0} 
                    onClick={handleGetRoute}
                    aria-label="Genereer route"
                >
                    Genereer Route
                </button>
            </div>

            <table>
                <tbody>
                    {error && (
                        <tr>
                            <td  tabIndex={0}><ErrorDisplay message={error} /></td>
                        </tr>
                    )}
                    {route && (
                        <tr>
                            <td tabIndex={0}><RouteDisplay route={route} /></td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default OVApp;