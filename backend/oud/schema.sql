CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    city TEXT NOT NULL
);
-- -- Tabel voor perrons
-- CREATE TABLE IF NOT EXISTS platforms (
--     id INTEGER PRIMARY KEY,
--     station_id INTEGER NOT NULL,
--     platform_number TEXT NOT NULL,
--     FOREIGN KEY (station_id) REFERENCES stations(id)
-- );
-- -- Tabel voor uitgangen
-- CREATE TABLE IF NOT EXISTS exits (
--     id INTEGER PRIMARY KEY,
--     station_id INTEGER NOT NULL,
--     exit_name TEXT NOT NULL,
--     FOREIGN KEY (station_id) REFERENCES stations(id)
-- );

-- Tabel voor navigatie-instructies
CREATE TABLE IF NOT EXISTS navigation_steps (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    -- exit_id INTEGER,
    -- platform_id INTEGER,
    step_number INTEGER NOT NULL,
    instruction_text TEXT NOT NULL,
    environment_description TEXT,
    distance_meters INTEGER,
    FOREIGN KEY (station_id) REFERENCES stations(id),
    -- FOREIGN KEY (exit_id) REFERENCES exits(id),
    -- FOREIGN KEY (platform_id) REFERENCES platforms(id)
);

-- -- Tabel voor reizen
-- CREATE TABLE IF NOT EXISTS journeys (
--     id INTEGER PRIMARY KEY,
--     departure_platform_id INTEGER NOT NULL,
--     arrival_platform_id INTEGER NOT NULL,
--     departure_time DATETIME NOT NULL,
--     arrival_time DATETIME NOT NULL,
--     FOREIGN KEY (departure_platform_id) REFERENCES platforms(id),
--     FOREIGN KEY (arrival_platform_id) REFERENCES platforms(id)
-- );
