import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { getIO } from '../../../../lib/websocket';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id || !session?.user?.organizationId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const taskId = req.query.taskId as string;
    const { id: userId, organizationId } = session.user;

    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                organizationId
            }
        }
    });

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    switch (req.method) {
        case 'GET':
            const comments = await prisma.comment.findMany({
                where: { taskId },
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            });
            return res.status(200).json(comments);

        case 'POST':
            const comment = await prisma.comment.create({
                data: {
                    content: req.body.content,
                    taskId,
                    userId
                },
                include: { user: true }
            });

            const io = getIO();
            io.to(`org:${organizationId}`).emit('notification', {
                type: 'TASK_COMMENT',
                message: `New comment on task: ${task.title}`,
                taskId,
                userId,
                timestamp: new Date()
            });

            return res.status(201).json(comment);

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
