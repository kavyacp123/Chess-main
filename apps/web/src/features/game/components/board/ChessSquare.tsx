import { Color, PieceSymbol, Square } from 'chess.js';

interface ChessSquareProps {
  square: {
    square: Square;
    type: PieceSymbol;
    color: Color;
  };
}

export const ChessSquare = ({ square }: ChessSquareProps) => {
  return (
    <div className="h-full justify-center flex flex-col">
      {square ? (
        <img
          className="w-[4.25rem]"
          src={`/${square?.color === 'b' ? `b${square.type}` : `w${square.type}`}.png`}
          alt={`${square.color} ${square.type}`}
        />
      ) : null}
    </div>
  );
};
