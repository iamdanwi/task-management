import { Task, Priority, TaskStatus } from '@prisma/client';

export interface TaskFilters {
    status?: TaskStatus;
    priority?: Priority;
    assigneeId?: string;
    projectId?: string;
    search?: string;
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
    return tasks.filter(task => {
        const matchesStatus = !filters.status || task.status === filters.status;
        const matchesPriority = !filters.priority || task.priority === filters.priority;
        const matchesAssignee = !filters.assigneeId || task.assigneeId === filters.assigneeId;
        const matchesProject = !filters.projectId || task.projectId === filters.projectId;
        const matchesSearch = !filters.search ||
            task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            task.description?.toLowerCase().includes(filters.search.toLowerCase());

        return matchesStatus && matchesPriority && matchesAssignee && matchesProject && matchesSearch;
    });
}
