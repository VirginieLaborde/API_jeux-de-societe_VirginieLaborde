/**
 * Ce controller est chargé de centraliser les middlewares (MW) liés à la bonne exécution du jeu
 */

const mainController = {

    /**
     * MW pour renvoyer l'erreur 404 
     * @module notFound
     * @function
     * @param {Express.Request} [request] - objet représentant la requête
     * @param {Express.Reponse} response - objet représentant la réponse
     */
    notFound : (request, response) => {
        response.status(404).json({
            erreur: 'page non trouvée !'
        });
    },

    /**
     * MW qui ne s'exécutera que si on lui passe une erreur en argument
     * @module errorHandler
     * @function
     * @param {object} error - objet représentant l'erreur, avec son message
     * @param {Express.Request} [request] - objet représentant la requête
     * @param {Express.response} response - objet représentant la réponse
     * @param {function} [next] - prochain MW
     */
    errorHandler: (error, request, response, next) => {
        console.trace(error);
        console.log(error.message);
        response.status(500).json({
            erreur: error.message
        });
    } 

}

module.exports = mainController;