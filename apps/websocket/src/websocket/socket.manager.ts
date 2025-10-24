import { WebSocketServer, WebSocket } from 'ws';
import { GameManager } from '../game/game.manager';
import { AuthService, AuthUser } from '../auth/auth.service';

export class SocketManager {
  private wss: WebSocketServer;
  private gameManager: GameManager;

  constructor(port: number = 3001) {
    this.wss = new WebSocketServer({ port });
    this.gameManager = new GameManager();
    this.setupWebSocketServer();
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws: WebSocket, req) => {
      try {
        const token = this.extractTokenFromUrl(req.url);
        const authUser = AuthService.extractAuthUser(token);
        
        if (!authUser) {
          ws.close(1008, 'Authentication failed');
          return;
        }

        const player = {
          id: authUser.userId,
          username: authUser.username,
          isGuest: authUser.isGuest,
          rating: 1200 // Default rating
        };

        this.gameManager.addUser(player, ws);

        ws.on('close', () => {
          this.gameManager.removeUser(ws);
        });

        ws.on('error', (error) => {
          console.error('WebSocket error:', error);
        });

      } catch (error) {
        console.error('Connection error:', error);
        ws.close(1008, 'Connection failed');
      }
    });

    console.log(`WebSocket server running on port ${this.wss.options.port}`);
  }

  private extractTokenFromUrl(url: string | undefined): string {
    if (!url) return '';
    
    const urlObj = new URL(url, 'http://localhost');
    return urlObj.searchParams.get('token') || '';
  }

  public close() {
    this.wss.close();
  }
}
