interface GameModeComponentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const GameModeComponent = ({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}: GameModeComponentProps) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 border-gray-600 hover:border-gray-500 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
