const db = require('../database');

class Boardgame {
    id;
    name;
    minAge;
    minPlayers;
    maxPlayers;
    type;
    note;
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

    async save(game) {
        const result = await db.query(`
            SELECT * 
            FROM new_boardgame($1,$2,$3,$4,$5,$6,$7,$8);`, [
                this.name,
                this.minAge,
                this.minPlayers,
                this.maxPlayers,
                this.type,
                this.note,
                this.duration,
                this.creator
            ]);
            this.id = result.rows[0].id;
        // pas besoin de retourner l'objet, il est déjà dans le contexte global
    }

};

module.exports = Boardgame;