import { DataSource } from "typeorm";
import { Project } from "../models/entities/Project";
import { Task } from "../models/entities/Task";
import { Organization } from "../models/entities/Organization";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "task_management",
    synchronize: true,
    logging: false,
    entities: [Project, Task, Organization],
    migrations: [],
    subscribers: []
});


export const setupDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

