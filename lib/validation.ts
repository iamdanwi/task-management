import { z } from 'zod';
import { Priority, TaskStatus } from '@prisma/client';

export const taskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(Priority),
  dueDate: z.string().datetime().optional().nullable(),
  assigneeId: z.string().optional(),
  projectId: z.string(),
});

export const projectSchema = z.object({
  name: z.string().min(1).max(255),
});

export type TaskInput = z.infer<typeof taskSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
