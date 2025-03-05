export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

export class Task {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus = TaskStatus.TODO;
    priority: TaskPriority = TaskPriority.MEDIUM;
    dueDate: Date | null = null;
    completedAt: Date | null = null;
    projectId: string;
    assigneeId: string | null = null;
    dependencies: string[] = []; // Store dependency task IDs instead of Task objects
    metadata: Record<string, any> | null = null;
    tags: string[] = [];
    isActive: boolean = true;
    createdAt: Date;
    updatedAt: Date;

    constructor(data?: Partial<Task>) {
        this.id = data?.id || crypto.randomUUID();
        this.title = data?.title || '';
        this.description = data?.description || null;
        this.status = data?.status || TaskStatus.TODO;
        this.priority = data?.priority || TaskPriority.MEDIUM;
        this.dueDate = data?.dueDate || null;
        this.completedAt = data?.completedAt || null;
        this.projectId = data?.projectId || '';
        this.assigneeId = data?.assigneeId || null;
        this.dependencies = data?.dependencies || [];
        this.metadata = data?.metadata || null;
        this.tags = data?.tags || [];
        this.isActive = data?.isActive ?? true;
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
    }
}