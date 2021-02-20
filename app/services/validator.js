/**
 * @module validateBody - fonction pour valider le corps d'une requête
 * @function
 * @param {Joi.object} schema - le schéma à valider
 * @param {Express.Request} [request] - objet représentant la requête
 * @param {Express.response} response - objet représentant la réponse
 * @param {function} [next] - prochain MW
 * @returns 
 */
const validateBody = (schema) => (request, response, next) => {
    // on regarde ce qu'il y a dans req.body et on le valide par rapport au schema Joi
    const { error } = schema.validate(request.body);

    if (error) {
        response.status(400).json(error.message);
    } else {
        next();
    }
};

/**
 * @module validateQuery - fonction pour valider la query string d'une requête
 * @function
 * @param {Joi.object} schema - le schéma à valider
 * @param {Express.Request} [request] - objet représentant la requête
 * @param {Express.response} response - objet représentant la réponse
 * @param {function} [next] - prochain MW
 */
const validateQuery = (schema) => (request, response, next) => {
    // on regarde ce qu'il y a dans req.query et on le valide par rapport au schema Joi
    const { error } = schema.validate(request.query);

    if (error) {
        response.status(400).json(error.message);
    } else {
        next();
    }
};

module.exports = {
    validateBody,
    validateQuery
};