export interface GameState {
  id: string;
  whitePlayer: Player;
  blackPlayer: Player;
  status: GameStatus;
  moves: Move[];
  currentFen: string;
  startTime: Date;
  endTime?: Date;
}

export interface Player {
  id: string;
  username: string;
  isGuest: boolean;
  rating: number;
}

export interface Move {
  from: string;
  to: string;
  san: string;
  before: string;
  after: string;
  timestamp: Date;
}

export enum GameStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
  TIME_UP = 'TIME_UP',
  PLAYER_EXIT = 'PLAYER_EXIT'
}

export enum GameResult {
  WHITE_WINS = 'WHITE_WINS',
  BLACK_WINS = 'BLACK_WINS',
  DRAW = 'DRAW'
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
