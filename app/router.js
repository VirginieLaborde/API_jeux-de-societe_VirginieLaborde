const { Router } = require('express');
const router = Router();

const boardgameController = require('./controllers/boardgameController');

// Pour utiliser le module Joi 
// afin de valider les données passées par les utilisateurs
const { validateBody } = require('./services/validator');
const boardgameSchema = require('./schemas/boardgameProposal');

router.route('/boardgames')
    .get(boardgameController.allBoardgames)
    .post(validateBody(boardgameSchema), boardgameController.insertBoardgame);

router.get('/boardgames/:id', boardgameController.oneBoardgame);

module.exports = router;