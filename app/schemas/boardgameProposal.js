const Joi = require('joi');

const schema = Joi.object({

    name: Joi.string()
        .alter({
            post: (schema) => schema.required()
        }),

    minAge: Joi.number().integer().positive()
        .alter({
            post: (schema) => schema.required()
        }),

    minPlayers: Joi.number().integer().positive()
        .alter({
            post: (schema) => schema.required()
        }),

    maxPlayers: Joi.number().integer().positive(),

    type: Joi.string()
        .alter({
            post: (schema) => schema.required()
        }),

    note: Joi.number().integer().positive()
        .alter({
            post: (schema) => schema.required()
        }),

    duration: [
            Joi.number().integer().positive()
                .alter({
                    post: (schema) => schema.required()
                }), // en minutes
            Joi.object({ // un objet avec des heures et des minutes
                hours: Joi.number().integer().positive()
                    .alter({
                        post: (schema) => schema.required()
                    }),
                minutes: Joi.number().integer().positive()
                    .alter({
                        post: (schema) => schema.required()
                    }),
            })
    ],

    creator:Joi.string()
        .alter({
            post: (schema) => schema.required()
        }),
});

const postSchema = schema.tailor('post');

exports.schema = schema;
exports.postSchema = postSchema;