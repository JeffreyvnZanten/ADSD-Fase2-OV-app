// StationSelector.tsx
import React from 'react';
import { Station } from '../../../backend/server';

interface StationSelectorProps {
    label: string;
    value: string;
    stations: Station[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    tabindex: number;
}

export default function StationSelector({ 
    label, 
    value, 
    stations, 
    onChange,
    tabindex
}: StationSelectorProps) {
    return (
        <div className='downunder'>
            <label>{label}:</label>
            <select tabIndex={tabindex} value={value} onChange={onChange}>
                <option value="">-- Selecteer {label.toLowerCase()} --</option>
                {stations.map((station) => (
                    <option key={station.id} value={station.name}>
                        {station.name}
                    </option>
                ))}
            </select>
        </div>
    );
}