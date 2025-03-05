CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    has_assistance BOOLEAN NOT NULL,
    accessibility_info TEXT
);

CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY,
    departure_station_id INTEGER NOT NULL,
    arrival_station_id INTEGER NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    FOREIGN KEY (departure_station_id) REFERENCES stations(id),
    FOREIGN KEY (arrival_station_id) REFERENCES stations(id)
);

CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    number TEXT NOT NULL,
    location_description TEXT,
    has_tactile_paving BOOLEAN NOT NULL,
    audio_beacon_info TEXT,
    FOREIGN KEY (station_id) REFERENCES stations(id)
);

CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY,
    route_id INTEGER NOT NULL,
    platform_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status TEXT,
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
);