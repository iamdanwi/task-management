import { TaskInput } from './validation';

export async function fetchTasks(projectId?: string) {
  const url = projectId ? `/api/tasks?projectId=${projectId}` : '/api/tasks';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(task: TaskInput) {
  if (!task.projectId || task.projectId.trim() === '') {
    throw new Error('Project ID is required');
  }

  // Ensure all required fields are present
  const taskData = {
    ...task,
    projectId: task.projectId.trim(),
  };

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(taskData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create task');
  }
  return data;
}

export async function updateTask(id: string, task: TaskInput) {
  if (!task.projectId || task.projectId.trim() === '') {
    throw new Error('Project ID is required');
  }

  const taskData = {
    ...task,
    projectId: task.projectId.trim(),
  };

  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update task');
  }
  return data;
}

export async function deleteTask(id: string) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(project: { name: string }) {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create project');
  }
  return data;
}
