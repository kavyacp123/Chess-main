import { Chess, Move } from 'chess.js';
import { GameMessage, GameMessageType, MovePayload } from '../types/game.types';

export class GameService {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<GameMessageType, (payload: any) => void> = new Map();

  connect(url: string): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(url);
      
      this.socket.onopen = () => {
        resolve(this.socket!);
      };
      
      this.socket.onerror = (error) => {
        reject(error);
      };
      
      this.socket.onmessage = (event) => {
        const message: GameMessage = JSON.parse(event.data);
        const handler = this.messageHandlers.get(message.type as GameMessageType);
        if (handler) {
          handler(message.payload);
        }
      };
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: GameMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  onMessage(type: GameMessageType, handler: (payload: any) => void): void {
    this.messageHandlers.set(type, handler);
  }

  removeMessageHandler(type: GameMessageType): void {
    this.messageHandlers.delete(type);
  }

  // Game-specific methods
  initGame(): void {
    this.sendMessage({ type: 'init_game' });
  }

  joinRoom(gameId: string): void {
    this.sendMessage({
      type: 'join_room',
      payload: { gameId }
    });
  }

  makeMove(movePayload: MovePayload): void {
    this.sendMessage({
      type: 'move',
      payload: movePayload
    });
  }

  exitGame(gameId: string): void {
    this.sendMessage({
      type: 'exit_game',
      payload: { gameId }
    });
  }

  // Chess utility methods
  static isPromoting(chess: Chess, from: string, to: string): boolean {
    if (!from) return false;

    const piece = chess.get(from as any);
    if (piece?.type !== 'p') return false;
    if (piece.color !== chess.turn()) return false;
    if (!['1', '8'].some((it) => to.endsWith(it))) return false;

    return chess
      .history({ verbose: true })
      .map((it) => it.to)
      .includes(to);
  }

  static createMove(chess: Chess, from: string, to: string): Move | null {
    try {
      if (this.isPromoting(chess, from, to)) {
        return chess.move({ from, to, promotion: 'q' });
      } else {
        return chess.move({ from, to });
      }
    } catch (error) {
      console.error('Invalid move:', error);
      return null;
    }
  }
}
