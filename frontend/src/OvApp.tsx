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
        <div>
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
        <button onClick={handleGetRoute}>Genereer Route</button>
        <button onClick={handleReset} style={{ marginTop: '10px', backgroundColor: 'green' }}>Reset</button>

        {route && (
            <RouteDescription route={route} />
        )}
        </div>
    );
}

export default OVApp;