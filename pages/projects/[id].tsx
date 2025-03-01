import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { PrismaClient, Project, Task } from '@prisma/client';
import { TaskList } from '../../components/tasks/TaskList';
import { NotificationBell } from '../../components/notifications/NotificationBell';

interface ProjectDetailsProps {
    project: Project & {
        tasks: Task[];
    };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <NotificationBell />
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-2xl font-bold">{project.tasks.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                <TaskList projectId={project.id} />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        };
    }

    const prisma = new PrismaClient();
    const project = await prisma.project.findFirst({
        where: {
            id: context.params?.id as string,
            organizationId: session.user.organizationId,
        },
        include: {
            tasks: true,
        },
    });

    if (!project) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            project: JSON.parse(JSON.stringify(project)),
        },
    };
};
