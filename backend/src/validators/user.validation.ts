import Joi from 'joi';

export const userValidation = {
    getCurrentUser: Joi.object({}),

    updateUser: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        role: Joi.string().valid('user', 'admin')
    }),

    getUserById: Joi.object({
        id: Joi.string().required()
    }),

    deleteUser: Joi.object({
        id: Joi.string().required()
    })
};