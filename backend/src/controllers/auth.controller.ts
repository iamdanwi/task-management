import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../models/entities/User';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from '../types/auth.types';

const tokenStore = new Map<string, {
    token: string;
    expiresAt: Date;
    type: TokenType;
    userId: string;
}>();

const PASSWORD_RESET_EXPIRY = 3600000; // 1 hour in milliseconds
const ACCESS_TOKEN_EXPIRY = 86400000; // 24 hours in milliseconds
const REFRESH_TOKEN_EXPIRY = 604800000; // 7 days in milliseconds

const generateTokens = (id: string) => {
    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    const now = new Date();

    tokenStore.set(accessToken, {
        token: accessToken,
        expiresAt: new Date(now.getTime() + ACCESS_TOKEN_EXPIRY),
        type: TokenType.ACCESS,
        userId: id
    });

    tokenStore.set(refreshToken, {
        token: refreshToken,
        expiresAt: new Date(now.getTime() + REFRESH_TOKEN_EXPIRY),
        type: TokenType.REFRESH,
        userId: id
    });

    return { accessToken, refreshToken };
};

const generatePasswordResetToken = (id: string) => {
    const resetToken = uuidv4();
    const now = new Date();

    tokenStore.set(resetToken, {
        token: resetToken,
        expiresAt: new Date(now.getTime() + PASSWORD_RESET_EXPIRY),
        type: TokenType.PASSWORD_RESET,
        userId: id
    });

    return resetToken;
};

const validateUserData = (email: string, name?: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError('Invalid email format', 400);
    }
    if (name && (name.length < 2 || name.length > 50)) {
        throw new AppError('Name must be between 2 and 50 characters', 400);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        validateUserData(email, name);

        const existingUser = await userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        if (!password || password.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = userRepo.create({
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER
        });

        await userRepo.save(user);

        const { accessToken, refreshToken } = generateTokens(user.id);

        res.status(201).json({
            status: 'success',
            accessToken,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Invalid credentials', 401);
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

        res.status(200).json({
            status: 'success',
            accessToken,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            tokenStore.delete(token);
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new AppError('Refresh token is required', 400);
        }

        const storedToken = tokenStore.get(refreshToken);
        if (!storedToken ||
            storedToken.type !== TokenType.REFRESH ||
            storedToken.expiresAt.getTime() < Date.now()) {
            throw new AppError('Invalid or expired refresh token', 401);
        }

        // Clean up the used refresh token
        tokenStore.delete(refreshToken);
        const userId = storedToken.userId;

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const tokens = generateTokens(user.id);

        res.status(200).json({
            status: 'success',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { email } });
        if (!user) {
            // Return success even if user not found for security
            return res.status(200).json({
                status: 'success',
                message: 'If a user with this email exists, password reset instructions will be sent'
            });
        }

        const resetToken = generatePasswordResetToken(user.id);

        // TODO: Send email with reset token
        // For development only - remove in production
        res.status(200).json({
            status: 'success',
            message: 'Password reset instructions sent to email',
            resetToken // Remove in production
        });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            throw new AppError('Reset token is required', 400);
        }

        if (!newPassword || newPassword.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400);
        }

        const storedToken = tokenStore.get(token);
        if (!storedToken ||
            storedToken.type !== TokenType.PASSWORD_RESET ||
            storedToken.expiresAt.getTime() < Date.now()) {
            throw new AppError('Invalid or expired reset token', 401);
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: storedToken.userId } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Clean up the used reset token
        tokenStore.delete(token);

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await userRepo.save(user);

        const tokens = generateTokens(user.id);

        res.status(200).json({
            status: 'success',
            message: 'Password successfully reset',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        next(error);
    }
};