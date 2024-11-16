import React, { useRef, useEffect, useState } from 'react';
import useOvApp from './hooks/useOvApp'; 
import StationSelector from './componenten/StationSelector';
import RouteDescription from './componenten/RouteDescription';
import { speak } from './hooks/useSpeak';
import './styles/tab.css';


function OVApp() {

    const hasPlayedRef = useRef(false);
    const intro = "Deze website is geoptimalisseerd voor blinde mensen. Je kan het volgende element selecteren met de tab-toets en teruggaan met shift-tab."
          + "Met spatie selecteer je een element. En met f7 hoor en je deze instructies opnieuw";
  
    useEffect(() => {
      if (!hasPlayedRef.current) {
        speak(intro);
        hasPlayedRef.current = true;
      }
    }, []); // Lege dependency array
  

    
    const {
        stations,
        departureStation,
        arrivalStation,
        route,
        handleDepartureChange,
        handleArrivalChange,
        handleGetRoute,
        handleReset
    } = useOvApp(); 

    return(
        <div className='box-1'>
        <h1>OV Stations Selector</h1>
        <StationSelector
            label="Vertrekstation"
            value={departureStation}
            stations={stations}
            onChange={handleDepartureChange}
            tabindex={0}
        />
            
        <StationSelector
            label="Aankomststation"
            value={arrivalStation}
            stations={stations}
            onChange={handleArrivalChange}
            tabindex={0}
        />
        <div className='button-wrapper'>
            <button tabIndex={0} onClick={handleGetRoute}>Genereer Route</button>
            <button onClick={handleReset}>Reset</button>
        </div>

        {route && (
            <RouteDescription route={route} />
        )}
        </div>
    );
}

export default OVApp;