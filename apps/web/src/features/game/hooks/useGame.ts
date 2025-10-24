import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Chess } from 'chess.js';
import { useSocket } from '../../../shared/hooks/useSocket';
import { useUser } from '@repo/store/useUser';
import { movesAtom, userSelectedMoveIndexAtom } from '@repo/store/chessBoard';
import { GameService } from '../services/game.service';
import { GameState, GameMetadata, GameResult, Player, GameMessageType } from '../types/game.types';

const GAME_TIME_MS = 10 * 60 * 1000;

export const useGame = () => {
  const socket = useSocket();
  const { gameId } = useParams();
  const user = useUser();
  const navigate = useNavigate();
  
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [added, setAdded] = useState(false);
  const [started, setStarted] = useState(false);
  const [gameMetadata, setGameMetadata] = useState<GameMetadata | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [player1TimeConsumed, setPlayer1TimeConsumed] = useState(0);
  const [player2TimeConsumed, setPlayer2TimeConsumed] = useState(0);
  const [gameID, setGameID] = useState('');
  
  const setMoves = useSetRecoilState(movesAtom);
  const userSelectedMoveIndex = useRecoilValue(userSelectedMoveIndexAtom);
  const userSelectedMoveIndexRef = useRef(userSelectedMoveIndex);

  useEffect(() => {
    userSelectedMoveIndexRef.current = userSelectedMoveIndex;
  }, [userSelectedMoveIndex]);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      handleGameMessage(message);
    };

    if (gameId !== 'random') {
      socket.send(
        JSON.stringify({
          type: GameMessageType.JOIN_ROOM,
          payload: { gameId },
        })
      );
    }
  }, [chess, socket, gameId]);

  const handleGameMessage = (message: any) => {
    switch (message.type) {
      case GameMessageType.GAME_ADDED:
        setAdded(true);
        setGameID(message.gameId);
        break;
        
      case GameMessageType.INIT_GAME:
        setBoard(chess.board());
        setStarted(true);
        navigate(`/game/${message.payload.gameId}`);
        setGameMetadata({
          blackPlayer: message.payload.blackPlayer,
          whitePlayer: message.payload.whitePlayer,
        });
        break;
        
      case GameMessageType.MOVE:
        const { move, player1TimeConsumed, player2TimeConsumed } = message.payload;
        setPlayer1TimeConsumed(player1TimeConsumed);
        setPlayer2TimeConsumed(player2TimeConsumed);
        
        if (userSelectedMoveIndexRef.current !== null) {
          setMoves((moves) => [...moves, move]);
          return;
        }
        
        try {
          if (GameService.isPromoting(chess, move.from, move.to)) {
            chess.move({
              from: move.from,
              to: move.to,
              promotion: 'q',
            });
          } else {
            chess.move({ from: move.from, to: move.to });
          }
          setMoves((moves) => [...moves, move]);
        } catch (error) {
          console.log('Error applying move:', error);
        }
        break;
        
      case GameMessageType.GAME_OVER:
        setResult(message.payload.result);
        break;
        
      case GameMessageType.GAME_ENDED:
        let wonBy;
        switch (message.payload.status) {
          case 'COMPLETED':
            wonBy = message.payload.result !== 'DRAW' ? 'CheckMate' : 'Draw';
            break;
          case 'PLAYER_EXIT':
            wonBy = 'Player Exit';
            break;
          default:
            wonBy = 'Timeout';
        }
        setResult({
          result: message.payload.result,
          by: wonBy,
        });
        chess.reset();
        setStarted(false);
        setAdded(false);
        break;
        
      case GameMessageType.USER_TIMEOUT:
        setResult(message.payload.win);
        break;
        
      case GameMessageType.GAME_JOINED:
        setGameMetadata({
          blackPlayer: message.payload.blackPlayer,
          whitePlayer: message.payload.whitePlayer,
        });
        setPlayer1TimeConsumed(message.payload.player1TimeConsumed);
        setPlayer2TimeConsumed(message.payload.player2TimeConsumed);
        setStarted(true);

        message.payload.moves.map((x: any) => {
          if (GameService.isPromoting(chess, x.from, x.to)) {
            chess.move({ ...x, promotion: 'q' });
          } else {
            chess.move(x);
          }
        });
        setMoves(message.payload.moves);
        break;
        
      case GameMessageType.GAME_TIME:
        setPlayer1TimeConsumed(message.payload.player1Time);
        setPlayer2TimeConsumed(message.payload.player2Time);
        break;
        
      default:
        alert(message.payload.message);
        break;
    }
  };

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (chess.turn() === 'w') {
          setPlayer1TimeConsumed((p) => p + 100);
        } else {
          setPlayer2TimeConsumed((p) => p + 100);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [started, gameMetadata, user, chess]);

  const getTimer = (timeConsumed: number) => {
    const timeLeftMs = GAME_TIME_MS - timeConsumed;
    const minutes = Math.floor(timeLeftMs / (1000 * 60));
    const remainingSeconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

    return (
      <div className="text-white">
        Time Left: {minutes < 10 ? '0' : ''}
        {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </div>
    );
  };

  const handleExit = () => {
    socket?.send(
      JSON.stringify({
        type: GameMessageType.EXIT_GAME,
        payload: { gameId },
      })
    );
    setMoves([]);
    navigate('/');
  };

  const initGame = () => {
    socket?.send(
      JSON.stringify({
        type: GameMessageType.INIT_GAME,
      })
    );
  };

  return {
    // State
    chess,
    board,
    setBoard,
    added,
    started,
    gameMetadata,
    result,
    player1TimeConsumed,
    player2TimeConsumed,
    gameID,
    socket,
    gameId,
    user,
    
    // Actions
    getTimer,
    handleExit,
    initGame,
  };
};
