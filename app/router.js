const { Router } = require('express');
const router = Router();

const boardgameController = require('./controllers/boardgameController');
const mainController = require('./controllers/mainController');

// Pour utiliser le module Joi 
// afin de valider les données passées par les utilisateurs
const { validateBody } = require('./services/validator');
const { schema, postSchema} = require('./schemas/boardgameProposal');

router.get('/boardgames',boardgameController.allBoardgames);
router.post('/boardgames',validateBody(postSchema), boardgameController.newBoardgame);
 
router.get('/boardgames/:id(\\d+)', boardgameController.oneBoardgame);
router.delete('/boardgames/:id(\\d+)', boardgameController.deleteOneBoardgame);
router.patch('/boardgames/:id(\\d+)', validateBody(schema), boardgameController.updateOneBoardgame);

router.use(mainController.notFound);
router.use(mainController.erreurServeur);

module.exports = router;