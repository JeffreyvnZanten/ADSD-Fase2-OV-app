-- Stations
INSERT INTO stations (id, name, code, city, exit, platform) VALUES
(1, 'Station Amsterdam Centraal', 'AMS', 'Amsterdam', 'Noord uitgang', 'platform 2'),
(2, 'Station Rotterdam Centraal', 'RTD', 'Rotterdam', 'West uitgang', 'platform 3');

-- De navigatie-instructies voor Amsterdam
INSERT INTO navigation_steps (id, station_id, step_number, instruction_text, environment_description, distance_meters) VALUES
(1, 1, 1, 'Loop vanaf hoofdingang rechtdoor naar de poortjes', 'Draaideur geluid achter je, geribbelde tegels', 10),
(2, 1, 2, 'Ga door de poortjes', 'Piep van de poortjes', 2),
(3, 1, 3, 'Loop rechtdoor naar centrale hal', 'Piano links, Starbucks rechts', 15),
(4, 1, 4, 'Draai rechtsaf bij de T-splitsing', 'Kruising in geribbelde tegels', 0),
(5, 1, 5, 'Loop naar de liften', 'Geluid van roltrappen', 20);

-- De navigatie-instructies voor Rotterdam
INSERT INTO navigation_steps (id, station_id, step_number, instruction_text, environment_description, distance_meters) VALUES
(6, 2, 1, 'Verlaat perron 3 via de lift', 'Liftdeuren met audiosignaal', 5),
(7, 2, 2, 'Loop rechtdoor naar centrale hal', 'Echo van grote ruimte', 15),
(8, 2, 3, 'Volg geribbelde lijn naar noorduitgang', 'Geluid van toegangspoortjes', 20);
