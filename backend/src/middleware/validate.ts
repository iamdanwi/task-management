import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');

            return next(new AppError(errorMessage, 400));
        }

        next();
    };
};

// Common validation schemas
export const schemas = {
    // User schemas
    userRegister: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
            .messages({ 'any.only': 'Passwords do not match' }),
    }),

    userLogin: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    // Organization schemas
    organization: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().valid('company', 'university').required(),
        description: Joi.string().allow(''),
    }),

    // Project schemas
    project: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(''),
        organizationId: Joi.string().required(),
    }),

    // Task schemas
    task: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        status: Joi.string().valid('todo', 'in-progress', 'completed').default('todo'),
        dueDate: Joi.date().allow(null),
        projectId: Joi.string().required(),
        assignedTo: Joi.string().allow(null),
        timeSpent: Joi.number().min(0).default(0),
    }),
};

