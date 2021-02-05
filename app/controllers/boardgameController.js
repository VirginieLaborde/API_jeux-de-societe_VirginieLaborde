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
        const newGame = new Boardgame(newGameData);
        await newGame.save(); // on await pour être sûr que tout est ok et bien réceptionner l'id créé
        response.json(newGame);
    }

}

module.exports = boardgameController;