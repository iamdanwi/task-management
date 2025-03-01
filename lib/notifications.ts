import { io, Socket } from 'socket.io-client';
import { Notification } from './websocket';
import { logger } from './logger';

let socket: Socket | null = null;

export async function initializeNotifications(onNotification: (notification: Notification) => void) {
  if (!socket) {
    // Initialize Socket.IO connection
    try {
      // First, ensure the Socket.IO server is initialized
      await fetch('/api/socket');

      socket = io({
        path: '/api/socketio',
        addTrailingSlash: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['polling', 'websocket'],
        forceNew: true,
        timeout: 20000
      });

      socket.on('connect', () => {
        logger.info('WebSocket connected successfully');
      });

      socket.on('connect_error', (error: Error) => {
        logger.error('Socket connection error:', error.message);
      });

      socket.on('error', (error: Error) => {
        logger.error('Socket error:', error);
      });

      socket.on('notification', (notification: Notification) => {
        logger.info('Received notification:', notification);
        onNotification(notification);
      });

      socket.on('disconnect', (reason: string) => {
        logger.info(`WebSocket disconnected: ${reason}`);
      });
    } catch (error) {
      logger.error('Failed to initialize Socket.IO:', error);
    }
  }

  return () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
}

export function getIO(): Socket {
  if (!socket) {
    throw new Error('Socket.IO not initialized. Call initializeNotifications first.');
  }
  return socket;
}
