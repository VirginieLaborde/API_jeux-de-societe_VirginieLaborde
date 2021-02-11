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
        const newGameData = request.body; // les infos du jeu à modifier
        if (typeof newGameData.duration === "object") {
            newGameData.duration=60*newGameData.duration.hours + newGameData.duration.minutes;
        };

        const newGame = new Boardgame(newGameData);
        try {   
            const requestedGame = await Boardgame.findOne(id);  
            if (requestedGame.id===undefined) {
                next();
            } else {   
                await newGame.update(id); 
                response.json(newGame); 
            }
        } catch (error) {
            next(error);
        }
    }

}

module.exports = boardgameController;