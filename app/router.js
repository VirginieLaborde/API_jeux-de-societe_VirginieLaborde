const { Router } = require('express');
const router = Router();

const boardgameController = require('./controllers/boardgameController');
const mainController = require('./controllers/mainController');

// Pour utiliser le module Joi 
// afin de valider les données passées par les utilisateurs
const { validateBody } = require('./services/validator');
const { schema, postSchema} = require('./schemas/boardgameProposal');

/**
 * @route GET /boardgames
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Retourne tous les jeux de société trouvés en base de données
 * @returns {JSON} 200 - tous les jeux actuellement dans la base de données
 */
router.get('/boardgames',boardgameController.allBoardgames);

/**
 * @route POST /boardgames
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Enregistre un nouveau jeu en base de données
 * @param {Boardgame.model} boardgame.body.required
 * @returns {JSON} 200 - le jeu créé 
*/
router.post('/boardgames',validateBody(postSchema), boardgameController.newBoardgame);

/**
 * @route GET /boardgames/{id}
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Retourne 1 jeu trouvé en base de données
 * @param {number} id.path.required - l'id du jeu, à fournir
 * @returns {JSON} 200 - 1 jeu 
*/
router.get('/boardgames/:id(\\d+)', boardgameController.oneBoardgame);

/**
 * @route DELETE /boardgames/{id}
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Supprimer 1 jeu en base de données
 * @param {number} id.path.required - l'id du jeu, à fournir
 * @returns {JSON} 200
*/
router.delete('/boardgames/:id(\\d+)', boardgameController.deleteOneBoardgame);

/**
 * @route PATCH /boardgames/{id}
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Modifie une ou plusieurs informations sur un jeu existant
 * @param {number} id.path.required - l'id du jeu, à fournir
 * @param {Boardgame.model} boardgame.body.required
 * @returns {JSON} 200 - le jeu modifié 
*/
router.patch('/boardgames/:id(\\d+)', validateBody(schema), boardgameController.updateOneBoardgame);

router.use(mainController.notFound);
router.use(mainController.errorHandler);

module.exports = router;