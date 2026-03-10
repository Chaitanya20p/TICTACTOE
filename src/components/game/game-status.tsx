"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GameStatusProps {
  status: string;
  isThinking: boolean;
}

export function GameStatus({ status, isThinking }: GameStatusProps) {
  const isWin = status.toLowerCase().includes("win") || status.toLowerCase().includes("draw");

  return (
    <div className="mb-3 text-center">
      <div className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300",
        isWin ? "bg-accent text-accent-foreground scale-105 shadow-md" : "bg-primary/10 text-primary"
      )}>
        {isThinking && <Loader2 className="w-4 h-4 animate-spin" />}
        {status}
      </div>
    </div>
  );
}
