import React from 'react';
import useOvApp from './hooks/useOvApp'; 
import StationSelector from './componenten/StationSelector';
import RouteDescription from './componenten/RouteDescription';


function OVApp() {
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
            />
            
            <StationSelector
                label="Aankomststation"
                value={arrivalStation}
                stations={stations}
                onChange={handleArrivalChange}
            />
        <div className='button-wrapper'>
            <button onClick={handleGetRoute}>Genereer Route</button>
            <button onClick={handleReset}>Reset</button>
        </div>

        {route && (
            <RouteDescription route={route} />
        )}
        </div>
    );
}

export default OVApp;