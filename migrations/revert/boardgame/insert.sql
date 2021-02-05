-- Revert portfolio:boardgame/insert from pg

BEGIN;

DROP FUNCTION new_boardgame(text, pint, pint, pint, text, pint, pint, text);

COMMIT;
