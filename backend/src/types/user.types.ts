import { Request } from 'express';
import { User } from '../models/entities/User';

// Request Types
export interface UpdateUserRequestBody {
    name?: string;
    email?: string;
    password?: string;
    role?: 'user' | 'admin';
}

// Response Types
export interface UserResponse {
    status: 'success';
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    };
}

export interface DeleteUserResponse {
    status: 'success';
    data: null;
}

// Extended Request Types
export interface UserRequest extends Request {
    user?: User;
}

// Parameter Types
export interface UserIdParams {
    id: string;
}