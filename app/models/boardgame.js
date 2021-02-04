const db = require('../database');

class Boardgame {
    id;
    name;
    minAge;
    minPlayers;
    maxPlayers;
    duration;
    creator;

    // gérer la conversion de la casse (camelCase ici, snake_case côté BDD)
    set min_players(val) {
        this.minPlayers = val;
    }

    set max_players(val) {
        this.maxPlayers = val;
    }

    set min_age(val) {
        this.minAge = val;
    }

    constructor(data = {}) {
        for (const property in data) {
            this[property] = data[property];
        }
    }

    static async findAll() {
        const result = await db.query('SELECT * FROM boardgame;');
        return result.rows.map(game => new Boardgame(game));        
    }

    static async findOne(id) {
        const result = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);
        return new Boardgame(result.rows[0]);
    }

    static async save(game) {
        const result = await db.query(`INSERT INTO "boardgame" 
            ("name", "min_age", "min_players", "max_players", "type", "note", "duration", "creator")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING "id"`,
            [game.name, game.min_age, game.min_players, game.max_players, game.type, game.note, game.duration, game.creator]);
        return result ;
    }

};

module.exports = Boardgame;