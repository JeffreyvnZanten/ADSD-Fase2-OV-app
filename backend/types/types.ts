// types.ts
export interface Station {
    id: number
    name: string
    code: string
    city: string
    platform: string
    exit: string
}

export interface RouteRequest {
    departureStation: string
    arrivalStation: string
}

export interface Route {
    departure: string
    arrival: string
    steps: string[]
}

export interface ApiError {
    error: string
}