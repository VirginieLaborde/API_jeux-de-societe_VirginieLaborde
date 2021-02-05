const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    minAge: Joi.number().integer().positive().required(),
    minPlayers: Joi.number().integer().positive().required(), 
    maxPlayers: Joi.number().integer().positive(),
    type: Joi.string().required(),
    note: Joi.number().integer().positive().required(),
    duration: [
            Joi.number().integer().positive().required(), // en minutes
            Joi.object({ // un objet avec des heures et des minutes
                hours: Joi.number().integer().positive().required(),
                minutes: Joi.number().integer().positive().required()
            })
    ],
    creator:Joi.string().required()
});

module.exports = schema;