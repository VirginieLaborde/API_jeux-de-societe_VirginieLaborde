const mainController = {

    notFound : (request, response) => {
        response.status(404).json({
            erreur: 'page non trouvée !'
        });
    },

    // ce middleware ne s'exécutera que si on lui passe une erreur
    erreurServeur: (error, request, response, next) => {
        console.trace(error);
        console.log(error.message);
        response.status(500).json({
            erreur: error.message
        });
    } 

}

module.exports = mainController;