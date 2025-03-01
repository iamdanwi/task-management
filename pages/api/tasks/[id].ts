import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import { taskSchema } from '../../../lib/validation';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const taskId = req.query.id as string;

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        organizationId: session.user.organizationId,
      },
    },
  });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json(task);

    case 'PUT':
      try {
        const data = taskSchema.parse(req.body);
        const updatedTask = await prisma.task.update({
          where: { id: taskId },
          data,
          include: {
            assignee: true,
            project: true,
          },
        });
        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid input' });
      }

    case 'DELETE':
      await prisma.task.delete({ where: { id: taskId } });
      return res.status(204).end();

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
