import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager.js';  // Add .js extension
import url from 'url';
import { extractAuthUser } from './auth.js';      // Add .js extension
import { SpringBootService } from './springBootService.js';

const wss = new WebSocketServer({ port: 3001 }); // Changed from 8080 to avoid conflict with Spring Boot

const gameManager = new GameManager();
const springBootService = new SpringBootService();

wss.on('connection', function connection(ws, req) {
  // Remove @ts-ignore comment (TypeScript specific)
  const token = url.parse(req.url, true).query.token;
  const user = extractAuthUser(token, ws);
  gameManager.addUser(user);

  ws.on('close', () => {
    gameManager.removeUser(ws);
  });
});

console.log('WebSocket server running on port 3001');
