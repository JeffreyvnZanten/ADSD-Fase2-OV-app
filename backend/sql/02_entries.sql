-- Stations
INSERT INTO stations (id, name, code, city, exit, platform) VALUES
(1, 'Station Amsterdam Centraal', 'AMS', 'Amsterdam', 'Noord uitgang', 'platform 2'),
(2, 'Station Rotterdam Centraal', 'RTD', 'Rotterdam', 'West uitgang', 'platform 3'),
(3, 'Station Utrecht Centraal', 'UTC', 'Utrecht', 'Zuid uitgang', 'platform 5'),
(4, 'Station Den Haag Centraal', 'GVC', 'Den Haag', 'Noord uitgang', 'platform 4'),
(5, 'Station Eindhoven Centraal', 'EHV', 'Eindhoven', 'Oost uitgang', 'platform 1'),
(6, 'Station Groningen', 'GN', 'Groningen', 'West uitgang', 'platform 2');

INSERT INTO journeys (id, departure_time, arrival_time, departure_date, arrival_date, departure_station_id, arrival_station_id) VALUES
(1, '10:00', '11:00', '2024-12-25', '2024-12-25', 1, 2),
(2, '10:00', '11:00', '2024-12-25', '2024-12-25', 2, 1),
(3, '08:30', '09:45', '2024-12-25', '2024-12-25', 3, 4),
(4, '12:15', '13:30', '2024-12-25', '2024-12-25', 4, 3),
(5, '09:00', '10:30', '2024-12-25', '2024-12-25', 5, 6),
(6, '11:45', '13:15', '2024-12-25', '2024-12-25', 6, 5),
(7, '14:00', '15:15', '2024-12-25', '2024-12-25', 1, 3),
(8, '15:30', '16:45', '2024-12-25', '2024-12-25', 3, 1),
(9, '13:00', '14:30', '2024-12-25', '2024-12-25', 2, 5),
(10, '16:00', '17:30', '2024-12-25', '2024-12-25', 5, 2);

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
