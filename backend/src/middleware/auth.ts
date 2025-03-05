import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { AppDataSource } from '../config/database';
import { User } from '../models/entities/User';
import { TokenType } from '../types/auth.types';

declare const tokenStore: Map<string, {
    token: string;
    expiresAt: Date;
    type: TokenType;
    userId: string;
}>;

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError('Not authorized to access this route', 401);
        }

        const storedToken = tokenStore.get(token);
        if (!storedToken || 
            storedToken.type !== TokenType.ACCESS || 
            storedToken.expiresAt.getTime() < Date.now()) {
            throw new AppError('Invalid or expired token', 401);
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: storedToken.userId } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        (req as AuthRequest).user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};

export const restrictTo = (...roles: string[]) => {
    return authorize(roles);
};

