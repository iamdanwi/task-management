import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { projectSchema } from '../../../lib/validation';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const projectId = req.query.id as string;

    if (!session?.user?.organizationId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            organizationId: session.user.organizationId
        }
    });

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    switch (req.method) {
        case 'GET':
            const fullProject = await prisma.project.findUnique({
                where: { id: projectId },
                include: {
                    tasks: {
                        include: {
                            assignee: true
                        }
                    }
                }
            });
            return res.status(200).json(fullProject);

        case 'PUT':
            try {
                const data = projectSchema.parse(req.body);
                const updatedProject = await prisma.project.update({
                    where: { id: projectId },
                    data
                });
                return res.status(200).json(updatedProject);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid input' });
            }

        case 'DELETE':
            await prisma.project.delete({ where: { id: projectId } });
            return res.status(204).end();

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
