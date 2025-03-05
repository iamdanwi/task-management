import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../models/entities/User';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: req.user!.id } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            status: 'success',
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

export const updateCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: req.user!.id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new AppError('Invalid email format', 400);
            }
            const existingUser = await userRepo.findOne({ where: { email } });
            if (existingUser && existingUser.id !== user.id) {
                throw new AppError('Email already in use', 400);
            }
        }
        if (name && (name.length < 2 || name.length > 50)) {
            throw new AppError('Name must be between 2 and 50 characters', 400);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            if (password.length < 8) {
                throw new AppError('Password must be at least 8 characters long', 400);
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        await userRepo.save(user);

        res.status(200).json({
            status: 'success',
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

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: req.params.id } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            status: 'success',
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: req.params.id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (!req.user || req.user.role !== 'admin') {
            throw new AppError('Only admin can update other users', 403);
        }

        // Validate email if provided
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new AppError('Invalid email format', 400);
            }
            const existingUser = await userRepo.findOne({ where: { email } });
            if (existingUser && existingUser.id !== user.id) {
                throw new AppError('Email already in use', 400);
            }
            user.email = email;
        }

        // Validate name if provided
        if (name) {
            if (name.length < 2 || name.length > 50) {
                throw new AppError('Name must be between 2 and 50 characters', 400);
            }
            user.name = name;
        }

        // Validate role if provided
        if (role) {
            if (!['user', 'admin'].includes(role)) {
                throw new AppError('Invalid role specified', 400);
            }
            user.role = role;
        }

        // Update password if provided
        if (password) {
            if (password.length < 8) {
                throw new AppError('Password must be at least 8 characters long', 400);
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        await userRepo.save(user);

        res.status(200).json({
            status: 'success',
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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: req.params.id } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        await userRepo.remove(user);

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};