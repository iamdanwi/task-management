import { Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { logger } from './logger';

export type NotificationType =
  'TASK_CREATED'
  | 'TASK_UPDATED'
  | 'TASK_DELETED'
  | 'TASK_ASSIGNED'
  | 'TASK_COMMENT';

export interface Notification {
  type: NotificationType;
  message: string;
  taskId?: string;
  userId?: string;
  timestamp: Date;
}

let io: SocketServer | null = null;

export function initializeSocket(server: HTTPServer) {
  io = new SocketServer(server, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['polling', 'websocket'],
    allowEIO3: true,
    maxHttpBufferSize: 1e8,
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.engine.on('connection_error', (err) => {
    logger.error('Socket connection error:', err);
  });

  io.use(async (socket, next) => {
    try {
      const session = await getSession({ req: socket.request }) as Session;

      if (session?.user?.id && session?.user?.organizationId) {
        socket.data.userId = session.user.id;
        socket.data.organizationId = session.user.organizationId;
        next();
      } else {
        next(new Error('Unauthorized'));
      }
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    const organizationRoom = `org:${socket.data.organizationId}`;
    socket.join(organizationRoom);

    socket.on('disconnect', () => {
      socket.leave(organizationRoom);
    });
  });

  return io;
}

export function getIO(): SocketServer {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}
