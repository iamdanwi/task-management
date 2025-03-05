import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Organization, OrganizationType } from "../models/entities/Organization";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";

export const createOrganization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { name, type, description, logoUrl, settings } = req.body;
        const organizationRepo = AppDataSource.getRepository(Organization);

        const organization = organizationRepo.create({
            name,
            type,
            description,
            logoUrl,
            settings,
            ownerId: req.user!.id
        });

        await organizationRepo.save(organization);

        res.status(201).json({
            status: "success",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganizations = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const organizationRepo = AppDataSource.getRepository(Organization);
        const organizations = await organizationRepo.find({
            where: { ownerId: req.user!.id, isActive: true },
            order: { createdAt: "DESC" }
        });

        res.status(200).json({
            status: "success",
            data: organizations
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationRepo = AppDataSource.getRepository(Organization);
        const organization = await organizationRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!organization) {
            throw new AppError("Organization not found", 404);
        }

        res.status(200).json({
            status: "success",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, logoUrl, settings } = req.body;
        const organizationRepo = AppDataSource.getRepository(Organization);

        const organization = await organizationRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!organization) {
            throw new AppError("Organization not found", 404);
        }

        organization.name = name || organization.name;
        organization.description = description || organization.description;
        organization.logoUrl = logoUrl || organization.logoUrl;
        organization.settings = settings || organization.settings;

        await organizationRepo.save(organization);

        res.status(200).json({
            status: "success",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationRepo = AppDataSource.getRepository(Organization);
        const organization = await organizationRepo.findOne({
            where: { id: req.params.id, isActive: true }
        });

        if (!organization) {
            throw new AppError("Organization not found", 404);
        }

        organization.isActive = false;
        await organizationRepo.save(organization);

        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        next(error);
    }
};