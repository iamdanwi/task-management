import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Project } from '@prisma/client';
import { NotificationBell } from '../../components/notifications/NotificationBell';
import { ProjectModal } from '../../components/projects/ProjectModal';
import { fetchProjects } from '../../lib/api';
import Link from 'next/link';

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadProjects = async () => {
        try {
            const data = await fetchProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold">Task Management</h1>
                        </div>
                        <div className="flex items-center">
                            <NotificationBell />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        New Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                            <p className="text-sm text-gray-500">
                                Created: {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            </main>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => {
                    loadProjects();
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        };
    }

    return { props: {} };
};
