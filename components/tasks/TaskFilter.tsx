import React from 'react';
import { TaskFilters } from '../../lib/search';
import { Priority, TaskStatus } from '@prisma/client';

interface TaskFilterProps {
    filters: TaskFilters;
    onFilterChange: (filters: TaskFilters) => void;
}

export function TaskFilter({ filters, onFilterChange }: TaskFilterProps) {
    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={filters.status || ''}
                    onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TaskStatus })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">All</option>
                    {Object.values(TaskStatus).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                    value={filters.priority || ''}
                    onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as Priority })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">All</option>
                    {Object.values(Priority).map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                    type="text"
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                    placeholder="Search tasks..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
        </div>
    );
}
