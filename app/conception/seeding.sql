BEGIN ;

DELETE FROM "boardgame";

INSERT INTO boardgame 
("name", min_age, min_players, max_players, "type", note, duration, creator) 

VALUES
('7 wonders', 10, 2, 7, 'stratégie', 4, '40 minutes', 'Antoine Bauza'),
('Dixit', 8, 3, 6, 'créativité', 5, '60 minutes', 'Jean-Louis Roubira'),
('Cluedo', 8, 3, 6, 'déduction', 2, '60 minutes', 'Anthony Pratt'),
('Carcassonne', 8, 2, 5, 'stratégie', 4, '60 minutes', 'Klaus-Jürgen Wrede'),
('Code Names', 14, 2, 8, 'déduction', 3, '15 minutes', 'Vlaada Chvátil'),
('Saboteur', 9, 3, 10, 'stratégie', 4, '60 minutes', 'Frederic Moyersoen'),
('Blanc Manger Coco', 18, 3, 12, 'ambiance', 3, '60 minutes', 'Louis Roudaut');


COMMIT ;