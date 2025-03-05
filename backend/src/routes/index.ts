import { Router } from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import projectRoutes from "./project.routes"
import taskRoutes from "./task.routes"
import organizationRoutes from "./organization.routes"
import { errorHandler } from "../middleware/errorHandler"

const router = Router()

// Apply global middleware for all routes
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

// Mount route handlers
router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/projects", projectRoutes)
router.use("/tasks", taskRoutes)
router.use("/organizations", organizationRoutes)

// Global error handling
router.use(errorHandler)

export default router

