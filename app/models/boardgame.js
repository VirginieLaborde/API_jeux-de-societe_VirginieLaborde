const db = require('../database');

/**
 * On définit ici la classe Boardgame (jeu de société), dans l'approche Active Record
 */
class Boardgame {
    
    /**
     * Un jeu de société
     * @typedef Boardgame
     * @property {string} name="Test" - nom du jeu
     * @property {number} minAge="5" - âge minimum
     * @property {number} minPlayers="4" - nombre de joueurs minimum
     * @property {number} [maxPlayers="6"] - nombre de joueurs maximum
     * @property {string} type="familial" - type du jeu
     * @property {number} note="5" - note personnelle donnée au jeu 
     * @property {number} duration="20" - durée moyenne : en minutes ou en heure/minutes
     * @property {string} creator="Test" - créator du jeu
     */

    id;
    name;
    minAge;
    minPlayers;
    maxPlayers;
    type;
    note;
    duration;
    creator;

    // Pour gérer la conversion de la casse (camelCase ici, snake_case côté base de données)
    set min_players(val) {
        this.minPlayers = val;
    }
    set max_players(val) {
        this.maxPlayers = val;
    }
    set min_age(val) {
        this.minAge = val;
    }

    /**
     * Crée un jeu de société
     * @param {Object} data 
     */
    constructor(data = {}) {
        for (const property in data) {
            this[property] = data[property];
        }
    }

    /**
     * Méthode findAll, static & asynchrone : retourne tous les jeux trouvés en base de données
     * @returns {Boardgame} retourne un tableau d'instances de Boardgame
     */
    static async findAll() {
        try {         
            const result = await db.query('SELECT * FROM boardgame ORDER BY id ASC;');

            if (!result.rows[0]) {
                throw new Error("pas trouvé de jeu(x)");
            } 

            return result.rows.map(game => new Boardgame(game));   
        } catch (error) {
            throw new Error(error);
        }     
    }

    /**
     * Méthode findOne, static & asynchrone : retourne le jeu demandé, trouvé en base de données
     * @param {Number} id - id du jeu demandé, issu de la requête
     * @returns {Boardgame} retourne une instance de Boardgame
     */
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

    /**
     * Méthode save, asynchrone
     * Tire parti de la fonction SQL qui utilise le json 
     */
    async save() {
        try {         
            const result = await db.query(`SELECT * FROM new_boardgame($1);`, [this]);
            this.id = result.rows[0].id;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Méthode delete, asynchrone
     */
    async delete () {
        try {
            const result = await db.query(`DELETE FROM boardgame WHERE "id"=$1`,[this.id]);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Méthode update, asynchrone
     * @param {Number} id - id du jeu demandé, issu de la requête
     */
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