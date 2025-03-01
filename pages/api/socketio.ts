import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Socket } from 'net';
import { initializeSocket } from '../../lib/websocket';
import { logger } from '../../lib/logger';

export const config = {
    api: {
        bodyParser: false,
    },
};

interface SocketServer extends NetServer {
    io?: SocketIOServer;
}

interface CustomSocket extends Socket {
    server: SocketServer;
}

interface ResponseWithSocket extends NextApiResponse {
    socket: CustomSocket;
}

export default async function handler(
    req: NextApiRequest,
    res: ResponseWithSocket
) {
    try {
        if (!res.socket?.server?.io) {
            logger.info('Initializing Socket.IO server...');
            const httpServer = res.socket.server;
            res.socket.server.io = initializeSocket(httpServer);
            logger.info('Socket.IO server initialized successfully');
        }
        res.end();
    } catch (error) {
        logger.error('Failed to initialize Socket.IO server:', error);
        res.status(500).end();
    }
}
