"use client";

import { cn } from "@/lib/utils";
import { Circle, X } from "lucide-react";

interface CellProps {
  value: string;
  onClick: () => void;
  disabled: boolean;
  isWinner: boolean;
}

export function Cell({ value, onClick, disabled, isWinner }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== ""}
      className={cn(
        "relative aspect-square flex items-center justify-center text-4xl sm:text-5xl rounded-2xl bg-white transition-all duration-300 pookie-cell-hover pookie-shadow",
        isWinner && "bg-primary text-white scale-105 z-10",
        value === "" && !disabled && "hover:bg-muted/50 cursor-pointer",
        value !== "" && "cursor-default"
      )}
    >
      {value === "X" && (
        <div className="animate-pop-in flex items-center justify-center">
          <X className={cn("w-12 h-12 stroke-[3px]", isWinner ? "text-white" : "text-secondary")} />
        </div>
      )}
      {value === "O" && (
        <div className="animate-pop-in flex items-center justify-center">
          <Circle className={cn("w-10 h-10 stroke-[4px]", isWinner ? "text-white" : "text-primary")} />
        </div>
      )}
    </button>
  );
}
