CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    city TEXT NOT NULL
);
-- Tabel voor perrons
CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    platform_number TEXT NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(id)
);
-- Tabel voor uitgangen
CREATE TABLE IF NOT EXISTS exits (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    exit_name TEXT NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(id)
);
-- Tabel voor navigatie-instructies
CREATE TABLE IF NOT EXISTS navigation_steps (
    id INTEGER PRIMARY KEY,
    station_id INTEGER NOT NULL,
    exit_id INTEGER,
    platform_id INTEGER,
    step_number INTEGER NOT NULL,
    instruction_text TEXT NOT NULL,
    landmark_description TEXT,
    distance_meters INTEGER,
    FOREIGN KEY (station_id) REFERENCES stations(id),
    FOREIGN KEY (exit_id) REFERENCES exits(id),
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
);
-- Tabel voor reizen
CREATE TABLE IF NOT EXISTS journeys (
    id INTEGER PRIMARY KEY,
    departure_platform_id INTEGER NOT NULL,
    arrival_platform_id INTEGER NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    FOREIGN KEY (departure_platform_id) REFERENCES platforms(id),
    FOREIGN KEY (arrival_platform_id) REFERENCES platforms(id)
);


-- old data 
-- CREATE TABLE IF NOT EXISTS stations (
--   id INTEGER PRIMARY KEY,
--   name TEXT NOT NULL, 
--   code TEXT NOT NULL,
--   city TEXT NOT NULL,
--   platform TEXT NOT NULL,
--   exit TEXT NOT NULL
-- );

-- -- Adding OR IGNORE tells SQLite to skip records that would violate unique constraints
-- -- rather than throwing an error
-- INSERT OR IGNORE INTO stations (id, name, code, city, platform, exit) VALUES
-- (1, 'Station Amsterdam Centraal', 'AMS', 'Amsterdam', 'Perron 5', 'Hoofduitgang'),
-- (2, 'Station Rotterdam Centraal', 'RTD', 'Rotterdam', 'Perron 3', 'Noorduitgang'),
-- (3, 'Station Utrecht Centraal', 'UTC', 'Utrecht', 'Perron 12', 'Zuiduitgang'),
-- (4, 'Station Den Haag Centraal', 'DHG', 'Den Haag', 'Perron 7', 'Westuitgang'),
-- (5, 'Station Eindhoven Centraal', 'EHV', 'Eindhoven', 'Perron 2', 'Oostuitgang'),
-- (6, 'Station Arnhem Centraal', 'ARN', 'Arnhem', 'Perron 1', 'Hoofduitgang'); 