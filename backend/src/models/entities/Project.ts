export enum ProjectType {
    PROJECT = "project",
    SUBJECT = "subject"
}

export class Project {
    id: string;
    name: string;
    type: ProjectType;
    description: string | null;
    organizationId: string;
    totalUnits: number = 0;
    completedUnits: number = 0;
    metadata: Record<string, any> | null = null;
    tasks: string[] = []; // Store task IDs instead of Task objects
    isActive: boolean = true;
    createdAt: Date;
    updatedAt: Date;

    constructor(data?: Partial<Project>) {
        this.id = data?.id || crypto.randomUUID();
        this.name = data?.name || '';
        this.type = data?.type || ProjectType.PROJECT;
        this.description = data?.description || null;
        this.organizationId = data?.organizationId || '';
        this.totalUnits = data?.totalUnits || 0;
        this.completedUnits = data?.completedUnits || 0;
        this.metadata = data?.metadata || null;
        this.tasks = data?.tasks || [];
        this.isActive = data?.isActive ?? true;
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
    }
}