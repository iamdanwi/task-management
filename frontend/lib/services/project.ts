import { apiClient } from '../api-client';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  status?: Project['status'];
}

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const { data } = await apiClient.get<Project[]>('/projects');
    return data;
  },

  async getProjectById(id: string): Promise<Project> {
    const { data } = await apiClient.get<Project>(`/projects/${id}`);
    return data;
  },

  async createProject(projectData: CreateProjectData): Promise<Project> {
    const { data } = await apiClient.post<Project>('/projects', projectData);
    return data;
  },

  async updateProject(id: string, projectData: UpdateProjectData): Promise<Project> {
    const { data } = await apiClient.patch<Project>(`/projects/${id}`, projectData);
    return data;
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
};