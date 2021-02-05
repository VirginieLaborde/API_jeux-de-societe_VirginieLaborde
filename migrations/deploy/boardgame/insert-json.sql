-- Deploy portfolio:boardgame/insert-json to pg

BEGIN;

-- 2ème version monoparamètre qui bénéficie de la souplesse du connecteur postgres
-- l'objet passé en paramètre côté JS est transformé en sa représentation JSON côté SQL
CREATE FUNCTION new_boardgame(game json) RETURNS boardgame AS $$
INSERT INTO boardgame(
	"name", min_age,
	min_players, max_players,
	"type", note,
	duration, creator
) VALUES
(
    -- on parcourt le JSON pour récupérer une à une les propriétés qui nous intéressent
    -- l'opérateur ->> retourne toujours du texte, il faut le caster si nécessaire
	game->>'name', (game->>'minAge')::int,
	(game->>'minPlayers')::int, (game->>'maxPlayers')::int,
	game->>'type', (game->>'note')::int, 
	(game->>'duration' || ' minutes')::interval, game->>'creator'
)
RETURNING *;
$$ LANGUAGE sql;

COMMIT;
