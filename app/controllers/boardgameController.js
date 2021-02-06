const Boardgame = require('../models/boardgame');

const boardgameController = {
    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();
        response.json(games);
    },

    oneBoardgame : async (request, response) => {
        const id = Number(request.params.id);
        const game = await Boardgame.findOne(id);
        response.json(game);
    },

    newBoardgame : async (request, response) => {
        const newGameData = request.body; // les infos du jeu à rajouter
        
        // pour gérer le fait qu'on autorise des durations aussi en format
        // objet heure / minutes => convertir en minutes
        if (typeof newGameData.duration === "object") {
            newGameData.duration=60*newGameData.duration.hours + newGameData.duration.minutes;
        }

        const newGame = new Boardgame(newGameData);
        await newGame.save(); 
        response.json(newGame);
    },

    // TODO répondre s'il n'y a pas de jeu trouvé
    deleteOneBoardgame : async (request, response) => {
        const id = Number(request.params.id);
        const requestedGame = await Boardgame.findOne(id);
        const foundGame = new Boardgame(requestedGame);
        await foundGame.delete();
        response.json('ok');
    }

}

module.exports = boardgameController;