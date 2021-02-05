const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    min_age: Joi.number().integer().required(),
    min_players: Joi.number().integer().required(), 
    max_players: Joi.number().integer(),
    type: Joi.string().required(),
    note: Joi.number().integer().required(),
    duration: Joi.number().integer().required(),
    creator:Joi.string().required()
});

module.exports = schema;