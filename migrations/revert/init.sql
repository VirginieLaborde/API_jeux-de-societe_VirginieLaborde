-- Revert portfolio:init from pg

BEGIN;

DROP TABLE boardgame;

DROP DOMAIN pint;

COMMIT;
