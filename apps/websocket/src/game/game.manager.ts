import { WebSocket } from 'ws';
import { GameState, Player, Move, GameStatus, GameResult, GameMessage, GAME_MESSAGE_TYPES } from './game.types';
import { GameService } from './game.service';
import { SpringBootService } from '../services/spring-boot.service';

export class GameManager {
  private games: Map<string, GameState> = new Map();
  private users: Map<WebSocket, Player> = new Map();
  private pendingUser: Player | null = null;
  private springBootService = new SpringBootService();

  addUser(user: Player, socket: WebSocket) {
    this.users.set(socket, user);
    this.addHandler(user, socket);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.get(socket);
    if (user) {
      this.users.delete(socket);
      this.handleUserDisconnect(user);
    }
  }

  private addHandler(user: Player, socket: WebSocket) {
    socket.on('message', async (data) => {
      try {
        const message: GameMessage = JSON.parse(data.toString());
        await this.handleMessage(user, socket, message);
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
  }

  private async handleMessage(user: Player, socket: WebSocket, message: GameMessage) {
    switch (message.type) {
      case GAME_MESSAGE_TYPES.INIT_GAME:
        await this.handleInitGame(user, socket);
        break;
      case GAME_MESSAGE_TYPES.JOIN_ROOM:
        await this.handleJoinRoom(user, socket, message.payload);
        break;
      case GAME_MESSAGE_TYPES.MOVE:
        await this.handleMove(user, socket, message.payload);
        break;
      case GAME_MESSAGE_TYPES.EXIT_GAME:
        await this.handleExitGame(user, socket, message.payload);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  private async handleInitGame(user: Player, socket: WebSocket) {
    if (this.pendingUser) {
      // Create game with pending user
      const game = GameService.createGame(this.pendingUser, user);
      this.games.set(game.id, game);

      // Create game in Spring Boot backend
      await this.springBootService.createGame(this.pendingUser.id, user.id);

      // Notify both players
      this.notifyGameStart(game);
      this.pendingUser = null;
    } else {
      this.pendingUser = user;
      this.sendMessage(socket, {
        type: GAME_MESSAGE_TYPES.GAME_ADDED,
        payload: { gameId: 'pending' }
      });
    }
  }

  private async handleJoinRoom(user: Player, socket: WebSocket, payload: any) {
    const gameId = payload.gameId;
    const game = this.games.get(gameId);
    
    if (game) {
      this.sendMessage(socket, {
        type: GAME_MESSAGE_TYPES.GAME_JOINED,
        payload: {
          gameId: game.id,
          whitePlayer: game.whitePlayer,
          blackPlayer: game.blackPlayer,
          moves: game.moves,
          player1TimeConsumed: 0,
          player2TimeConsumed: 0
        }
      });
    }
  }

  private async handleMove(user: Player, socket: WebSocket, payload: any) {
    const { gameId, move } = payload;
    const game = this.games.get(gameId);
    
    if (game && this.isValidMove(game, user, move)) {
      // Add move to game
      GameService.addMove(gameId, move);
      
      // Broadcast move to opponent
      const opponent = this.getOpponent(game, user);
      if (opponent) {
        this.sendMessage(opponent.socket, {
          type: GAME_MESSAGE_TYPES.MOVE,
          payload: { move, gameId }
        });
      }
    }
  }

  private async handleExitGame(user: Player, socket: WebSocket, payload: any) {
    const { gameId } = payload;
    const game = this.games.get(gameId);
    
    if (game) {
      // End game due to player exit
      GameService.endGame(gameId, GameResult.PLAYER_EXIT);
      
      // Notify opponent
      const opponent = this.getOpponent(game, user);
      if (opponent) {
        this.sendMessage(opponent.socket, {
          type: GAME_MESSAGE_TYPES.GAME_ENDED,
          payload: {
            status: 'PLAYER_EXIT',
            result: GameResult.PLAYER_EXIT
          }
        });
      }
    }
  }

  private handleUserDisconnect(user: Player) {
    // Find active games for this user
    const activeGames = GameService.getActiveGamesByPlayerId(user.id);
    
    activeGames.forEach(game => {
      // End game due to disconnect
      GameService.endGame(game.id, GameResult.PLAYER_EXIT);
      
      // Notify opponent
      const opponent = this.getOpponent(game, user);
      if (opponent) {
        this.sendMessage(opponent.socket, {
          type: GAME_MESSAGE_TYPES.OPPONENT_DISCONNECTED,
          payload: { gameId: game.id }
        });
      }
    });
  }

  private notifyGameStart(game: GameState) {
    // Notify white player
    const whitePlayerSocket = this.getPlayerSocket(game.whitePlayer);
    if (whitePlayerSocket) {
      this.sendMessage(whitePlayerSocket, {
        type: GAME_MESSAGE_TYPES.INIT_GAME,
        payload: {
          gameId: game.id,
          whitePlayer: game.whitePlayer,
          blackPlayer: game.blackPlayer
        }
      });
    }

    // Notify black player
    const blackPlayerSocket = this.getPlayerSocket(game.blackPlayer);
    if (blackPlayerSocket) {
      this.sendMessage(blackPlayerSocket, {
        type: GAME_MESSAGE_TYPES.INIT_GAME,
        payload: {
          gameId: game.id,
          whitePlayer: game.whitePlayer,
          blackPlayer: game.blackPlayer
        }
      });
    }
  }

  private isValidMove(game: GameState, user: Player, move: any): boolean {
    // Basic validation - can be enhanced with chess logic
    return game.status === GameStatus.IN_PROGRESS && 
           (game.whitePlayer.id === user.id || game.blackPlayer.id === user.id);
  }

  private getOpponent(game: GameState, user: Player): { player: Player; socket: WebSocket } | null {
    const opponent = game.whitePlayer.id === user.id ? game.blackPlayer : game.whitePlayer;
    const socket = this.getPlayerSocket(opponent);
    return socket ? { player: opponent, socket } : null;
  }

  private getPlayerSocket(player: Player): WebSocket | null {
    for (const [socket, user] of this.users.entries()) {
      if (user.id === player.id) {
        return socket;
      }
    }
    return null;
  }

  private sendMessage(socket: WebSocket, message: GameMessage) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }
}
