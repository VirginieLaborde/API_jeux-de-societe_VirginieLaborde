const { Router } = require('express');
const router = Router();

const boardgameController = require('./controllers/boardgameController');
const mainController = require('./controllers/mainController');

// Pour utiliser le module Joi 
// afin de valider les données passées par les utilisateurs
const { validateBody } = require('./services/validator');
const boardgameSchema = require('./schemas/boardgameProposal');

router.get('/boardgames',boardgameController.allBoardgames);
router.post('/boardgames',validateBody(boardgameSchema), boardgameController.newBoardgame);
    
router.get('/boardgames/:id', boardgameController.oneBoardgame);
router.delete('/boardgames/:id', boardgameController.deleteOneBoardgame);
// router.patch('/boardgames/:id', boardgameController.updateOneBoardgame);

router.use(mainController.notFound);
router.use(mainController.erreurServeur);

module.exports = router;