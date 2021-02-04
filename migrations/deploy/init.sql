-- Deploy portfolio:init to pg

BEGIN;

-- domaine qui n'autorise que les valeurs positives
CREATE DOMAIN pint AS int CHECK (value > 0);

-- table recensant ma collection de jeux de société
CREATE TABLE boardgame (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "min_age" pint NOT NULL,
    "min_players" pint NOT NULL,
    "max_players" pint,
    "type" text NOT NULL, -- future table séparée + clé étrangère
    "note" pint NOT NULL,
    "duration" interval NOT NULL,
    "creator" text NOT NULL -- future table séparée + clé étrangère
);

COMMIT;
