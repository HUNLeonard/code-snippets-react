import React from "react";
import { cn } from "../../utils/cn";
import { LoadingText } from "./LoadingText";

interface ButtonProps {
  children: Readonly<React.ReactNode>;
  execute?: () => void;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string
}

export const Button = ({
  children,
  execute,
  type = "button",
  disabled = false,
  className
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={execute}
      disabled={disabled}
      className={cn("disabled:!cursor-not-allowed px-6 py-2 ",
        "bg-info text-info-content font-medium text-lg rounded-md",
        "not-disabled:hover:brightness-95 not-disabled:hover:-translate-y-0.5",
        "not-disabled:active:brightness-75 not-disabled:active:translate-y-0.5",
        "shadow-md transition-all duration-200",
        "disabled:brightness-50",
        className)}
    >
      {disabled
        ? <LoadingText />
        : children
      }
    </button>
  );
};
