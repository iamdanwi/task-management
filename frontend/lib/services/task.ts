import { apiClient } from '../api-client';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  projectId: string;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  priority: Task['priority'];
  dueDate: string;
  projectId: string;
  assigneeId: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: Task['status'];
}

export const taskService = {
  async getTasks(projectId?: string): Promise<Task[]> {
    const url = projectId ? `/tasks?projectId=${projectId}` : '/tasks';
    const { data } = await apiClient.get<Task[]>(url);
    return data;
  },

  async getTaskById(id: string): Promise<Task> {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const { data } = await apiClient.post<Task>('/tasks', taskData);
    return data;
  },

  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    const { data } = await apiClient.patch<Task>(`/tasks/${id}`, taskData);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  }
};