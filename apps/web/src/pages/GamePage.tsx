import { useGame } from '../features/game';
import { ChessBoard, MovesTable } from '../features/game';

export const GamePage = () => {
  const {
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
    getTimer,
    handleExit,
    initGame,
  } = useGame();

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="">
      {result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p>Result: {result.result}</p>
            <p>By: {result.by}</p>
            <button onClick={handleExit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
      
      {started && (
        <div className="justify-center flex pt-4 text-white">
          {(user.id === gameMetadata?.blackPlayer?.id ? 'b' : 'w') === chess.turn()
            ? 'Your turn'
            : "Opponent's turn"}
        </div>
      )}
      
      <div className="justify-center flex">
        <div className="pt-2 w-full">
          <div className="flex gap-8 w-full">
            <div className="text-white">
              <div className="flex justify-center">
                <div>
                  {started && (
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
                          <span>{gameMetadata?.blackPlayer?.name || 'Black'}</span>
                        </div>
                        {getTimer(
                          user.id === gameMetadata?.whitePlayer?.id
                            ? player2TimeConsumed
                            : player1TimeConsumed,
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="w-full flex justify-center text-white">
                      <ChessBoard
                        started={started}
                        gameId={gameId ?? ''}
                        myColor={user.id === gameMetadata?.blackPlayer?.id ? 'b' : 'w'}
                        chess={chess}
                        setBoard={setBoard}
                        socket={socket}
                        board={board}
                      />
                    </div>
                  </div>
                  {started && (
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
                        <span>{gameMetadata?.whitePlayer?.name || 'White'}</span>
                      </div>
                      {getTimer(
                        user.id === gameMetadata?.blackPlayer?.id
                          ? player2TimeConsumed
                          : player1TimeConsumed,
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-md pt-2 bg-bgAuxiliary3 flex-1 overflow-auto h-[95vh] overflow-y-scroll no-scrollbar">
              {!started ? (
                <div className="pt-8 flex justify-center w-full">
                  {added ? (
                    <div className="flex flex-col items-center space-y-4 justify-center">
                      <div className="text-white">Waiting for opponent...</div>
                      <div className="text-blue-500">Game ID: {gameID}</div>
                    </div>
                  ) : (
                    gameId === 'random' && (
                      <button
                        onClick={initGame}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Play
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="p-8 flex justify-center w-full">
                  <button
                    onClick={handleExit}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Exit Game
                  </button>
                </div>
              )}
              <div>
                <MovesTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
