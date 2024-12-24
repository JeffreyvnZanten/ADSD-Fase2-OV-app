CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    city TEXT NOT NULL,
    exit TEXT NOT NULL,
    platform TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS navigation_steps (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    instruction_text TEXT NOT NULL,
    environment_description TEXT,
    distance_meters INTEGER,
    FOREIGN KEY (station_id) REFERENCES stations(id)
);