interface NumberNotationProps {
  label: string;
  isMainBoxColor: boolean;
}

export const NumberNotation = ({ label, isMainBoxColor }: NumberNotationProps) => {
  return (
    <div
      className={`font-bold absolute ${
        isMainBoxColor ? 'text-[#739552]' : 'text-[#EBEDD0]'
      } left-0.5`}
    >
      {label}
    </div>
  );
};
