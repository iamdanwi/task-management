import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { projectSchema } from '../../../lib/validation';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.organizationId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
        case 'GET':
            const projects = await prisma.project.findMany({
                where: {
                    organizationId: session.user.organizationId
                },
                include: {
                    tasks: true
                }
            });
            return res.status(200).json(projects);

        case 'POST':
            try {
                const data = projectSchema.parse(req.body);
                const project = await prisma.project.create({
                    data: {
                        ...data,
                        organizationId: session.user.organizationId
                    }
                });
                return res.status(201).json(project);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid input' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
