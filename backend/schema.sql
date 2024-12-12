CREATE TABLE IF NOT EXISTS stations (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL, 
  code TEXT NOT NULL,
  city TEXT NOT NULL,
  platform TEXT NOT NULL,
  exit TEXT NOT NULL
);

-- Adding OR IGNORE tells SQLite to skip records that would violate unique constraints
-- rather than throwing an error
INSERT OR IGNORE INTO stations (id, name, code, city, platform, exit) VALUES
(1, 'Station Amsterdam Centraal', 'AMS', 'Amsterdam', 'Perron 5', 'Hoofduitgang'),
(2, 'Station Rotterdam Centraal', 'RTD', 'Rotterdam', 'Perron 3', 'Noorduitgang'),
(3, 'Station Utrecht Centraal', 'UTC', 'Utrecht', 'Perron 12', 'Zuiduitgang'),
(4, 'Station Den Haag Centraal', 'DHG', 'Den Haag', 'Perron 7', 'Westuitgang'),
(5, 'Station Eindhoven Centraal', 'EHV', 'Eindhoven', 'Perron 2', 'Oostuitgang'),
(6, 'Station Arnhem Centraal', 'ARN', 'Arnhem', 'Perron 1', 'Hoofduitgang');