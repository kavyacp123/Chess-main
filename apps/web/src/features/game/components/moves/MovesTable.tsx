import { Move } from 'chess.js';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isBoardFlippedAtom, movesAtom, userSelectedMoveIndexAtom } from '@repo/store/chessBoard';
import {
  HandshakeIcon,
  FlagIcon,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export const MovesTable = () => {
  const [userSelectedMoveIndex, setUserSelectedMoveIndex] = useRecoilState(userSelectedMoveIndexAtom);
  const setIsFlipped = useSetRecoilState(isBoardFlippedAtom);
  const moves = useRecoilValue(movesAtom);
  const movesTableRef = useRef<HTMLInputElement>(null);
  
  const movesArray = moves.reduce((result, _, index: number, array: Move[]) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, [] as Move[][]);

  useEffect(() => {
    if (movesTableRef && movesTableRef.current) {
      movesTableRef.current.scrollTo({
        top: movesTableRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [moves]);

  const handleMoveClick = (moveIndex: number) => {
    setUserSelectedMoveIndex(moveIndex);
  };

  const handleFirstMove = () => {
    setUserSelectedMoveIndex(0);
  };

  const handleLastMove = () => {
    setUserSelectedMoveIndex(moves.length - 1);
  };

  const handlePreviousMove = () => {
    if (userSelectedMoveIndex !== null && userSelectedMoveIndex > 0) {
      setUserSelectedMoveIndex(userSelectedMoveIndex - 1);
    }
  };

  const handleNextMove = () => {
    if (userSelectedMoveIndex !== null && userSelectedMoveIndex < moves.length - 1) {
      setUserSelectedMoveIndex(userSelectedMoveIndex + 1);
    }
  };

  const handleReset = () => {
    setUserSelectedMoveIndex(null);
    setIsFlipped(false);
  };

  return (
    <div className="text-[#C3C3C0] relative w-full">
      <div className="text-sm h-[45vh] max-h-[45vh] overflow-y-auto" ref={movesTableRef}>
        {movesArray.map((movePairs, index) => {
          return (
            <div key={index} className="flex">
              <div className="w-8 text-center text-[#C3C3C0]">{index + 1}.</div>
              <div className="flex-1 flex">
                {movePairs.map((move, moveIndex) => {
                  const actualIndex = index * 2 + moveIndex;
                  const isSelected = userSelectedMoveIndex === actualIndex;
                  
                  return (
                    <div
                      key={moveIndex}
                      className={`flex-1 text-center cursor-pointer p-1 rounded ${
                        isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                      }`}
                      onClick={() => handleMoveClick(actualIndex)}
                    >
                      {move.san}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handleFirstMove}
          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          title="First move"
        >
          <ChevronFirst className="w-4 h-4" />
        </button>
        <button
          onClick={handlePreviousMove}
          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          title="Previous move"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNextMove}
          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          title="Next move"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={handleLastMove}
          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          title="Last move"
        >
          <ChevronLast className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-600 rounded hover:bg-gray-500"
          title="Reset to current position"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
