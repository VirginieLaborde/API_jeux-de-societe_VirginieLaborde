const Joi = require('joi');

const variationPost = {
    post: (schema) => schema.required()
  }

const schema = Joi.object({

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

const postSchema = schema.tailor('post');

exports.schema = schema;
exports.postSchema = postSchema;