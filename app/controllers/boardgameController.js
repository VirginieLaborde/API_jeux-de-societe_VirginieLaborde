const Boardgame = require('../models/boardgame');

/**
 * Ce controller est chargé de centraliser les middlewares (MW) en lien avec le model de nos jeux de société
 */

const boardgameController = {

    /**
     * MW pour afficher TOUS les jeux de société
     * @module allBoardgames
     * @function
     * @param {Express.Request} [request] - objet représentant la requête
     * @param {Express.Response} response - objet représentant la réponse
     * @param {function} next - prochain MW 
     * @returns {JSON} - les jeux trouvés
     */
    allBoardgames : async (request, response, next) => {
        try {
            const games = await Boardgame.findAll();
            response.json(games);
        } catch (error) {
            next(error);
        }
    },

    /**
     * MW pour afficher UN jeu de société
     * L'identifiant du jeu est fournit dans les paramètres de la requête
     * @module oneBoardgame
     * @function
     * @param {Express.Request} request.params - objet de la requête, contient l'id du jeu recherché
     * @param {Express.Response} response - objet représentant la réponse
     * @param {function} next - prochain MW
     * @returns {JSON} - le jeu trouvé
     */
    oneBoardgame : async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const game = await Boardgame.findOne(id);
            response.json(game);
        } catch (error) {
            next(error);
        }
    },

    /**
     * MW pour ajouter un jeu de société
     * L'utilisateur fournit les informations dans le corps de la requête
     * @module newBoardgame
     * @function
     * @param {Express.Request} request.body - objet de la requête, contient les infos du jeu à ajouter
     * @param {Express.Response} response - objet représentant la réponse
     * @param {function} [next] - prochain MW
     * @returns {JSON} - le jeu sauvegardé
     */
    newBoardgame : async (request, response, next) => {
        const newGameData = request.body; // les infos du jeu à rajouter
        
        // pour gérer le fait qu'on autorise des durations aussi en format
        // objet heure / minutes => convertir en minutes
        if (typeof newGameData.duration === "object") {
            newGameData.duration=60*newGameData.duration.hours + newGameData.duration.minutes;
        }

        const newGame = new Boardgame(newGameData);
        try {        
            await newGame.save(); 
            response.json(newGame); 
        } catch (error) {
            next(error);
        }

    },

    /**
     * MW pour supprimer un jeu de société
     * L'identifiant du jeu est fournit dans les paramètres de la requête
     * @module deleteOneBoardgame
     * @function
     * @param {Express.Request} request.params - objet de la requête, contient l'id du jeu à supprimer
     * @param {Express.Response} response - objet représentant la réponse
     * @param {function} [next] - prochain MW
     * @returns {JSON} - succès
     */
    deleteOneBoardgame : async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const requestedGame = await Boardgame.findOne(id);
            if (requestedGame.id===undefined) {
                next();
            } else {            
                const foundGame = new Boardgame(requestedGame);
                await foundGame.delete();
                response.status(200).json(); 
            }
        } catch (error) {
            next(error);
        }
    },


    /**
     * MW pour mettre à jour UN jeu de société
     * L'identifiant du jeu est fournit dans les paramètres de la requête
     * L'utilisateur fournit les informations à modifier dans le corps de la requête
     * @module updateOneBoardgame
     * @function
     * @param {Express.Request} request.params - objet de la requête, contient l'id du jeu à supprimer
     * @param {Express.Request} request.body - objet de la requête, contient les infos du jeu à modifier
     * @param {Express.Response} response - objet représentant la réponse
     * @param {function} [next] - prochain MW
     * @returns {JSON} - le jeu modifié
     */
    updateOneBoardgame : async (request, response, next) => {

        console.log(request.body);
        console.log(request.params);
        const id = Number(request.params.id);
        const patchData = request.body; // les infos du jeu à modifier

        try {   

            // on récupère en BDD le jeu qu'on souhaite modifier
            const requestedGame = await Boardgame.findOne(id);  

            if (requestedGame.id===undefined) {
                next();

            } else { 
                // on vérifie quels champs sont renseignés dans le body
                // et on complète le reste
                for (const field in patchData) {
                    if (typeof requestedGame[field] !== 'undefined') {
                        requestedGame[field] = patchData[field];
                    }
                };

                if (typeof requestedGame.duration === "object") {
                    requestedGame.duration=60*requestedGame.duration.hours + requestedGame.duration.minutes;
                };

                const newGame = new Boardgame(requestedGame);
                await newGame.update(id); 
                response.json(newGame); 
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = boardgameController;