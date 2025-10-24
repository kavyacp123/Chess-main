import { SocketManager } from './websocket/socket.manager';

const PORT = parseInt(process.env.WS_PORT || '3001');

const socketManager = new SocketManager(PORT);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...');
  socketManager.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down WebSocket server...');
  socketManager.close();
  process.exit(0);
});
