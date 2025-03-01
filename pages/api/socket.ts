import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { initializeSocket } from '../../lib/websocket';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...');
    const httpServer: NetServer = res.socket.server as any;
    res.socket.server.io = initializeSocket(httpServer);
  }
  res.end();
};

export default ioHandler;
