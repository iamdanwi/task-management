import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { taskSchema } from '../../../lib/validation';
import { getIO } from '../../../lib/websocket';
import { logger } from '../../../lib/logger';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.organizationId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const projectId = req.query.projectId as string;
        const whereClause = {
          project: {
            organizationId: session.user.organizationId,
          },
          ...(projectId ? { projectId } : {}),
        };

        const tasks = await prisma.task.findMany({
          where: whereClause,
          include: {
            assignee: true,
            project: true,
          },
        });
        return res.status(200).json(tasks);

      case 'POST':
        try {
          const validatedData = taskSchema.parse(req.body);

          // Verify project belongs to organization
          const project = await prisma.project.findFirst({
            where: {
              id: validatedData.projectId,
              organizationId: session.user.organizationId,
            },
          });

          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }

          const task = await prisma.task.create({
            data: validatedData,
            include: {
              assignee: true,
              project: true,
            },
          });

          try {
            const io = getIO();
            if (io) {
              io.to(`org:${session.user.organizationId}`).emit('notification', {
                type: 'TASK_CREATED',
                message: `New task created: ${task.title}`,
                taskId: task.id,
                userId: session.user.id,
                timestamp: new Date(),
              });
            }
          } catch (error) {
            logger.error('Failed to emit socket event:', error);
            // Continue execution even if socket fails
          }

          return res.status(201).json(task);
        } catch (error) {
          logger.error('Failed to create task:', error);
          return res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid input' });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    logger.error('Unexpected error in task handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
