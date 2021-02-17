const Boardgame = require('../models/boardgame');

const boardgameController = {
    allBoardgames : async (request, response, next) => {
        try {
            const games = await Boardgame.findAll();
            response.json(games);
        } catch (error) {
            next(error);
        }
    },

    oneBoardgame : async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const game = await Boardgame.findOne(id);
            response.json(game);
        } catch (error) {
            next(error);
        }
    },

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

    updateOneBoardgame : async (request, response, next) => {
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