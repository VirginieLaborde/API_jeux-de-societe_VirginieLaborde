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

    // pour utiliser la fonction SQL qui utilise le json 
    async save() {
        const result = await db.query(`SELECT * FROM new_boardgame($1);`, [this]);
        this.id = result.rows[0].id;
    }

    async delete () {
        const result = await db.query(`DELETE FROM boardgame WHERE "id"=$1`,[this.id]);
    }

};

module.exports = Boardgame;