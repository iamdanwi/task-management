import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Project, ProjectType } from "../models/entities/Project";
import { Organization } from "../models/entities/Organization";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { name, type, description, organizationId, totalUnits, metadata } = req.body;
        const projectRepo = AppDataSource.getRepository(Project);
        const organizationRepo = AppDataSource.getRepository(Organization);

        const organization = await organizationRepo.findOne({
            where: { id: organizationId, isActive: true }
        });

        if (!organization) {
            throw new AppError("Organization not found", 404);
        }

        const project = projectRepo.create({
            name,
            type,
            description,
            organizationId,
            totalUnits: totalUnits || 0,
            completedUnits: 0,
            metadata
        });

        await projectRepo.save(project);

        res.status(201).json({
            status: "success",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { organizationId, type } = req.query;
        const projectRepo = AppDataSource.getRepository(Project);

        const whereClause: any = { isActive: true };
        if (organizationId) whereClause.organizationId = organizationId;
        if (type) whereClause.type = type;

        const projects = await projectRepo.find({
            where: whereClause,
            order: { createdAt: "DESC" },
            relations: ["organization"]
        });

        res.status(200).json({
            status: "success",
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectRepo = AppDataSource.getRepository(Project);
        const project = await projectRepo.findOne({
            where: { id: req.params.id, isActive: true },
            relations: ["organization", "tasks"]
        });

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        res.status(200).json({
            status: "success",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, totalUnits, completedUnits, metadata } = req.body;
        const projectRepo = AppDataSource.getRepository(Project);

        const project = await projectRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        project.name = name || project.name;
        project.description = description || project.description;
        project.totalUnits = totalUnits || project.totalUnits;
        project.completedUnits = completedUnits || project.completedUnits;
        project.metadata = metadata || project.metadata;

        await projectRepo.save(project);

        res.status(200).json({
            status: "success",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectRepo = AppDataSource.getRepository(Project);
        const project = await projectRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        project.isActive = false;
        await projectRepo.save(project);

        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        next(error);
    }
};