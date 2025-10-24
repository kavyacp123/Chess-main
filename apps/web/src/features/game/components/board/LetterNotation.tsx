interface LetterNotationProps {
  label: string;
  isMainBoxColor: boolean;
}

export const LetterNotation = ({ label, isMainBoxColor }: LetterNotationProps) => {
  return (
    <div
      className={`font-bold absolute ${
        isMainBoxColor ? 'text-[#739552]' : 'text-[#EBEDD0]'
      } right-0.5 bottom-0`}
    >
      {label}
    </div>
  );
};
