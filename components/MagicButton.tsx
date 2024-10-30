import React from "react";

interface MagicButtonProps {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
  disabled?: boolean;
}

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  disabled = false, // Set default to false
}: MagicButtonProps) => {
  return (
    <button
      className={`relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={disabled} // Add disabled attribute here
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
