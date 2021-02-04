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

    insertBoardgame : async (request, response) => {
        const game = request.body;
        await Boardgame.save(game);
        response.json(game);
    }

}

module.exports = boardgameController;