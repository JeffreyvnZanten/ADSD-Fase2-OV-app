// types.ts
/**
 * Type Definitions for the OV Application
 * 
 * This file contains all the TypeScript interfaces that define the shape of our data.
 * These types are used throughout both frontend and backend to ensure data consistency.
 * 
 * Key Concepts:
 * - Interface: A TypeScript way to define the structure of an object
 * - Export: Makes these types available to other files
 * - Optional properties: Marked with ? (not used here but good to know)
 */

import { idText } from "typescript"

/**
 * Station Interface
 * Represents a train station with all its properties
 * 
 * Example:
 * {
 *   id: 1,
 *   name: "Amsterdam Centraal",
 *   code: "AMS",
 *   city: "Amsterdam",
 *   platform: "Platform 2a",
 *   exit: "North Exit"
 * }
 */
export interface Station {
    platform: string
    
    exit: string
    /** Unique number to identify each station */
    id: number
    /** Complete name of the station (e.g., "Amsterdam Centraal") */
    name: string
    /** Short code used in systems (e.g., "AMS") */
    code: string
    /** City where the station is located */
    city: string
}

export interface navigation_step {
    
    id: number
    
    station_id: number

    step_number: number

    instruction_text: string
    
    environment_description: string
    
    distance_meters: number

} 

/**
 * RouteRequest Interface
 * Used when requesting a route calculation between stations
 * 
 * Example:
 * {
 *   departureStation: "Amsterdam",
 *   arrivalStation: "Rotterdam"
 * }
 */
export interface RouteRequest {
    /** City name of departure station */
    departureStation: string
    /** City name of arrival station */
    arrivalStation: string
}

/**
 * Route Interface
 * Contains the calculated route information and step-by-step instructions
 * 
 * Example:
 * {
 *   departure: "Amsterdam Centraal",
 *   arrival: "Rotterdam Centraal",
 *   steps: [
 *     "Go to Platform 3",
 *     "Take the train to Rotterdam",
 *     "Exit through the main hall"
 *   ]
 * }
 */
export interface Route {
    /** Starting station name */
    departure: string
    /** Destination station name */
    arrival: string
    /** Array of instructions for the traveler */
    steps: string[]
}

/**
 * ApiError Interface
 * Standard error response format for API requests
 * 
 * Example:
 * {
 *   error: "Station not found"
 * }
 */
export interface ApiError {
    /** Description of what went wrong */
    error: string
}

export interface StationSearchResponse {
    stations: Station[];
    metadata: {
        total: number;
        query: string;
    }
}

export interface StationSearchError {
    error: string;
    code: string;
}