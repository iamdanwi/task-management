import React, { useState } from 'react';
import { Project } from '@prisma/client';
import { createProject } from '../../lib/api';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export function ProjectModal({ isOpen, onClose, onSubmit }: ProjectModalProps) {
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await createProject(formData);
            onSubmit();
            onClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to create project');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium">Create New Project</h3>
                    {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                    <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
