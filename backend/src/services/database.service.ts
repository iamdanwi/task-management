import { User } from '../models/entities/User';
import { Project } from '../models/entities/Project';
import { Task, TaskStatus } from '../models/entities/Task';

// In-memory database for demonstration purposes
// In a real application, this would be replaced with actual database calls
class Database {
  private users: Map<string, User> = new Map();
  private projects: Map<string, Project> = new Map();
  private tasks: Map<string, Task> = new Map();

  // User methods
  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async saveUser(user: User): Promise<User> {
    user.updatedAt = new Date();
    this.users.set(user.id, user);
    return user;
  }

  // Project methods
  async findProjectById(id: string, includeInactive = false): Promise<Project | null> {
    const project = this.projects.get(id);
    if (!project || (!includeInactive && !project.isActive)) {
      return null;
    }
    return project;
  }

  async findProjects(criteria: Partial<Project> = {}): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => {
      // Filter by criteria
      for (const [key, value] of Object.entries(criteria)) {
        if (project[key as keyof Project] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  async saveProject(project: Project): Promise<Project> {
    project.updatedAt = new Date();
    this.projects.set(project.id, project);
    return project;
  }

  // Task methods
  async findTaskById(id: string, includeInactive = false): Promise<Task | null> {
    const task = this.tasks.get(id);
    if (!task || (!includeInactive && !task.isActive)) {
      return null;
    }
    return task;
  }

  async findTasks(criteria: Partial<Task> = {}): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => {
      // Filter by criteria
      for (const [key, value] of Object.entries(criteria)) {
        if (task[key as keyof Task] !== value) {
          return false;
        }
      }
      return task.isActive; // Only return active tasks by default
    });
  }

  async saveTask(task: Task): Promise<Task> {
    task.updatedAt = new Date();
    this.tasks.set(task.id, task);
    return task;
  }

  // Helper method to get tasks for a project
  async getTasksForProject(projectId: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      task => task.projectId === projectId && task.isActive
    );
  }

  // Helper method to get completed tasks count for a project
  async getCompletedTasksCount(projectId: string): Promise<number> {
    const tasks = await this.getTasksForProject(projectId);
    return tasks.filter(task => task.status === TaskStatus.DONE).length;
  }
}

// Singleton instance
export const db = new Database();