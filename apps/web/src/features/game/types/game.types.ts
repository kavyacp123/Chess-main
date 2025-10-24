import { Chess, Color, Move, PieceSymbol, Square } from 'chess.js';

export interface Player {
  id: string;
  name: string;
  isGuest: boolean;
}

export interface GameMetadata {
  blackPlayer: Player;
  whitePlayer: Player;
}

export interface GameResult {
  result: GameResultType;
  by: string;
}

export enum GameResultType {
  WHITE_WINS = 'WHITE_WINS',
  BLACK_WINS = 'BLACK_WINS',
  DRAW = 'DRAW',
}

export interface GameState {
  chess: Chess;
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
  started: boolean;
  gameMetadata: GameMetadata | null;
  result: GameResult | null;
  player1TimeConsumed: number;
  player2TimeConsumed: number;
  gameId: string;
}

export interface MovePayload {
  gameId: string;
  move: Move;
}

export interface GameMessage {
  type: string;
  payload?: any;
}

export const GAME_MESSAGE_TYPES = {
  INIT_GAME: 'init_game',
  MOVE: 'move',
  OPPONENT_DISCONNECTED: 'opponent_disconnected',
  GAME_OVER: 'game_over',
  JOIN_ROOM: 'join_room',
  GAME_JOINED: 'game_joined',
  GAME_ALERT: 'game_alert',
  GAME_ADDED: 'game_added',
  USER_TIMEOUT: 'user_timeout',
  GAME_TIME: 'game_time',
  GAME_ENDED: 'game_ended',
  EXIT_GAME: 'exit_game',
} as const;

export type GameMessageType = typeof GAME_MESSAGE_TYPES[keyof typeof GAME_MESSAGE_TYPES];
