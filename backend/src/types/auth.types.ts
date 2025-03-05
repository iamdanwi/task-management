import { Request } from 'express';
import { User } from '../models/entities/User';

export enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
    PASSWORD_RESET = 'password_reset'
}

// Request Types
export interface RegisterRequestBody {
    email: string;
    password: string;
    name?: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface RefreshTokenRequestBody {
    refreshToken: string;
}

export interface ForgotPasswordRequestBody {
    email: string;
}

export interface ResetPasswordRequestBody {
    token: string;
    newPassword: string;
}

// Response Types
export interface AuthResponse {
    status: 'success';
    accessToken: string;
    refreshToken: string;
    data?: {
        user: {
            id: string;
            email: string;
            name: string;
        };
    };
    message?: string;
}

// Token Types
export interface JwtPayload {
    id: string;
    type?: 'password_reset';
}

// Extended Request Types
export interface AuthRequest extends Request {
    user?: User;
}

export interface TokenData {
    token: string;
    expiresAt: Date;
    type: TokenType;
    userId: string;
}