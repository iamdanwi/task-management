import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Task, TaskStatus, TaskPriority } from "../models/entities/Task";
import { Project } from "../models/entities/Project";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { In } from "typeorm";

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { title, description, status, priority, dueDate, projectId, assigneeId, tags, metadata } = req.body;
        const taskRepo = AppDataSource.getRepository(Task);
        const projectRepo = AppDataSource.getRepository(Project);

        const project = await projectRepo.findOne({
            where: { id: projectId, isActive: true }
        });

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        const task = taskRepo.create({
            title,
            description,
            status: status || TaskStatus.TODO,
            priority: priority || TaskPriority.MEDIUM,
            dueDate,
            projectId,
            assigneeId,
            tags,
            metadata
        });

        await taskRepo.save(task);

        res.status(201).json({
            status: "success",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId, status, priority, assigneeId } = req.query;
        const taskRepo = AppDataSource.getRepository(Task);

        const whereClause: any = { isActive: true };
        if (projectId) whereClause.projectId = projectId;
        if (status) whereClause.status = status;
        if (priority) whereClause.priority = priority;
        if (assigneeId) whereClause.assigneeId = assigneeId;

        const tasks = await taskRepo.find({
            where: whereClause,
            order: { createdAt: "DESC" },
            relations: ["project", "assignee", "dependencies"]
        });

        res.status(200).json({
            status: "success",
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskRepo = AppDataSource.getRepository(Task);
        const task = await taskRepo.findOne({
            where: { id: req.params.id, isActive: true },
            relations: ["project", "assignee", "dependencies"]
        });

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.status(200).json({
            status: "success",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, status, priority, dueDate, assigneeId, tags, metadata } = req.body;
        const taskRepo = AppDataSource.getRepository(Task);

        const task = await taskRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.assigneeId = assigneeId || task.assigneeId;
        task.tags = tags || task.tags;
        task.metadata = metadata || task.metadata;

        if (status === TaskStatus.DONE && !task.completedAt) {
            task.completedAt = new Date();
        } else if (status !== TaskStatus.DONE) {
            task.completedAt = null;
        }

        await taskRepo.save(task);

        // Update project completion status if task status changed
        if (status) {
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);
            const project = await projectRepo.findOne({
                where: { id: task.projectId }
            });

            if (project) {
                // Get all tasks for this project
                const projectTasks = await taskRepo.find({
                    where: { projectId: project.id, isActive: true }
                });
                
                const completedTasks = projectTasks.filter(t => t.status === TaskStatus.DONE).length;
                project.completedUnits = completedTasks;
                await projectRepo.save(project);
            }
        }

        res.status(200).json({
            status: "success",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskRepo = AppDataSource.getRepository(Task);
        const task = await taskRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        task.isActive = false;
        await taskRepo.save(task);

        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        next(error);
    }
};

export const updateTaskDependencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dependencies } = req.body;
        const taskRepo = AppDataSource.getRepository(Task);

        const task = await taskRepo.findOne({
            where: { id: req.params.id, isActive: true },
            relations: ["dependencies"]
        });

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        // Update to use In operator instead of deprecated findByIds
        const dependencyTasks = await taskRepo.find({
            where: { id: In(dependencies) }
        });
        
        // Store only the IDs of dependency tasks
        task.dependencies = dependencyTasks.map(task => task.id);

        await taskRepo.save(task);

        res.status(200).json({
            status: "success",
            data: task
        });
    } catch (error) {
        next(error);
    }
};