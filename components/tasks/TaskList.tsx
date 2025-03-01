import React, { useState, useEffect, useCallback } from 'react';
import { Task } from '@prisma/client';
import { TaskFilter } from './TaskFilter';
import { TaskFilters, filterTasks } from '../../lib/search';
import { fetchTasks } from '../../lib/api';
import { TaskModal } from './TaskModal';
import { TaskComments } from './TaskComments';
import { ErrorMessage } from '../ErrorMessage';

interface TaskListProps {
    projectId?: string;
}

export function TaskList({ projectId }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState<TaskFilters>({ projectId });
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showComments, setShowComments] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadTasks = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchTasks(projectId);
            setTasks(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load tasks');
            console.error('Failed to load tasks:', error);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    useEffect(() => {
        setFilters(prev => ({ ...prev, projectId }));
    }, [projectId]);

    const filteredTasks = filterTasks(tasks, filters);

    if (error) {
        return <ErrorMessage message={error} onRetry={loadTasks} />;
    }

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <TaskFilter filters={filters} onFilterChange={setFilters} />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    New Task
                </button>
            </div>

            <div className="space-y-2">
                {filteredTasks.map((task) => (
                    <div key={task.id}>
                        <div
                            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            onClick={() => setSelectedTask(task)}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium">{task.title}</h3>
                                <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </div>

                            <p className="text-gray-600 mt-2">{task.description}</p>

                            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                <span>Status: {task.status}</span>
                                <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowComments(showComments === task.id ? null : task.id);
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {showComments === task.id ? 'Hide Comments' : 'Show Comments'}
                                </button>
                            </div>
                        </div>

                        {showComments === task.id && (
                            <div className="mt-2 ml-4">
                                <TaskComments taskId={task.id} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTask(undefined);
                }}
                onSubmit={() => {
                    loadTasks();
                    setIsModalOpen(false);
                    setSelectedTask(undefined);
                }}
                task={selectedTask}
                projectId={projectId || ''}
            />
        </div>
    );
}

function getPriorityColor(priority: string): string {
    switch (priority) {
        case 'HIGH':
            return 'bg-red-100 text-red-800';
        case 'MEDIUM':
            return 'bg-yellow-100 text-yellow-800';
        case 'LOW':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
