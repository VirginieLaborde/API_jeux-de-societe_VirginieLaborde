const Joi = require('joi');

/**
 * Factorisation pour ajouter la contrainte "required" aux propriétés à passer obligatoirement dans la route POST
 * @const {object} variationPost 
*/
const variationPost = {
    /**
     * @function post
     * @param {object} schema - le schéma Joi auquel on ajoute la contrainte "required"
     */
    post: (schema) => schema.required()
}

/**
 * Le schéma Joi de base ne contiendra pas la contrainte "required" pour pouvoir être utilisé dans route PATCH
 */
const schema = Joi.object({

    /**
     * @const {Joi.object} schema - le schéma de validation Joi
     * @property {string} name - nom du jeu, requis dans la route POST
     * @property {number} minAge - âge minimum : nombre entier positif, requis dans la route POST
     * @property {number} minPlayers - nombre de joueurs minimum : nombre entier positif, requis dans la route POST
     * @property {number} [maxPlayers] - nombre de joueurs maximum : nombre entier positif
     * @property {string} type - type du jeu, requis dans la route POST
     * @property {number} note - note personnelle donnée au jeu : nombre entier positif, requis dans la route POST
     * @property {number | object} duration - durée moyenne : en minutes ou en heure/minutes, requis dans la route POST
     * @property {string} creator - créator du jeu, requis dans la route POST
     */
    name: Joi.string().alter(variationPost),
    minAge: Joi.number().integer().positive().alter(variationPost),
    minPlayers: Joi.number().integer().positive().alter(variationPost),
    maxPlayers: Joi.number().integer().positive(),
    type: Joi.string().alter(variationPost),
    note: Joi.number().integer().positive().alter(variationPost),
    duration: [
            Joi.number().integer().positive().alter(variationPost), // en minutes
            Joi.object({ // un objet avec des heures et des minutes
                hours: Joi.number().integer().positive().alter(variationPost),
                minutes: Joi.number().integer().positive().alter(variationPost)
            })
    ],
    creator:Joi.string().alter(variationPost)
});

/**
 * Altération du schéma Joi de base, pour ajouter la contrainte "required" pour la route POST
 * @const {Joi.object} postSchema - schéma modifié 
 */
const postSchema = schema.tailor('post');

exports.schema = schema;
exports.postSchema = postSchema;