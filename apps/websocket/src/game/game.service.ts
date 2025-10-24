import { GameState, Player, Move, GameStatus, GameResult } from './game.types';
import { SpringBootService } from '../services/spring-boot.service';

export class GameService {
  private static games: Map<string, GameState> = new Map();
  private static springBootService = new SpringBootService();

  static createGame(whitePlayer: Player, blackPlayer: Player): GameState {
    const gameId = this.generateGameId();
    const game: GameState = {
      id: gameId,
      whitePlayer,
      blackPlayer,
      status: GameStatus.IN_PROGRESS,
      moves: [],
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      startTime: new Date(),
    };

    this.games.set(gameId, game);
    return game;
  }

  static getGame(gameId: string): GameState | undefined {
    return this.games.get(gameId);
  }

  static addMove(gameId: string, move: Move): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;

    game.moves.push(move);
    game.currentFen = move.after;
    
    // Save move to Spring Boot backend
    this.springBootService.saveMove(gameId, move);
    
    return true;
  }

  static updateGameStatus(gameId: string, status: GameStatus): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;

    game.status = status;
    if (status === GameStatus.COMPLETED) {
      game.endTime = new Date();
    }

    return true;
  }

  static endGame(gameId: string, result: GameResult): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;

    game.status = GameStatus.COMPLETED;
    game.endTime = new Date();

    // Update game result in Spring Boot backend
    this.springBootService.updateGameResult(gameId, result);

    return true;
  }

  static deleteGame(gameId: string): boolean {
    return this.games.delete(gameId);
  }

  static getAllGames(): GameState[] {
    return Array.from(this.games.values());
  }

  static getGamesByPlayerId(playerId: string): GameState[] {
    return Array.from(this.games.values()).filter(
      game => game.whitePlayer.id === playerId || game.blackPlayer.id === playerId
    );
  }

  static getActiveGamesByPlayerId(playerId: string): GameState[] {
    return this.getGamesByPlayerId(playerId).filter(
      game => game.status === GameStatus.IN_PROGRESS
    );
  }

  private static generateGameId(): string {
    return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
