/**
 * Application Entry Point
 * 
 * This file is the starting point of the React application. It handles:
 * 1. Setting up the React environment
 * 2. Finding the root DOM element
 * 3. Rendering the main application component
 * 
 * Key Concepts:
 * - ReactDOM.createRoot: Modern way to render React apps (React 18+)
 * - StrictMode: Development tool that highlights potential problems
 * - Root element: The main DOM element where React will render the app
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OVApp from './OvApp';

// Find the root element in index.html where React will render
const container = document.getElementById('root');

// Only proceed if we found the root element
if (container !== null) {
    // Create a React root using the container
    const root = ReactDOM.createRoot(container);
    
    // Render the main application
    root.render(
        // StrictMode enables extra development checks
        <React.StrictMode>
            <OVApp />
        </React.StrictMode>
    );
} else {
    // Log error if root element wasn't found
    console.error('Failed to find the container element');
}

// Performance monitoring code (commented out)
// Uncomment these lines to enable performance tracking:
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
