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
        try {         
            const result = await db.query('SELECT * FROM boardgame;');

            if (!result.rows[0]) {
                throw new Error("pas trouvé de jeu(x)");
            } 

            return result.rows.map(game => new Boardgame(game));   
        } catch (error) {
            throw new Error(error);
        }     
    }

    static async findOne(id) {
        try {
            const result = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);

            if (!result.rows[0]) {
                throw new Error("pas trouvé de jeu");
            } 

            return new Boardgame(result.rows[0]);
        } catch (error) {
            throw new Error(error);
        } 
    }

    // pour utiliser la fonction SQL qui utilise le json 
    async save() {
        try {         
            const result = await db.query(`SELECT * FROM new_boardgame($1);`, [this]);
            this.id = result.rows[0].id;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete () {
        try {
            const result = await db.query(`DELETE FROM boardgame WHERE "id"=$1`,[this.id]);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id) {
        try {         
            await db.query(`
                UPDATE boardgame 
                SET "name" = $1,
                    min_age = $2,
                    min_players = $3,
                    max_players = $4,
                    "type" = $5,
                    note = $6,
                    duration = $7,
                    creator = $8
                WHERE id = $9`, 
                [this.name, this.minAge, 
                    this.minPlayers, this.maxPlayers,
                    this.type, this.note,
                    this.duration, this.creator,
                    id]);
        } catch (error) {
            throw new Error(error);
        }
    }

};

module.exports = Boardgame;