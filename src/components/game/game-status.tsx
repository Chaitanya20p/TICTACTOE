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
    <div className="mb-2 text-center">
      <div className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300",
        isWin ? "bg-accent text-accent-foreground scale-105 shadow-sm" : "bg-primary/10 text-primary"
      )}>
        {isThinking && <Loader2 className="w-3 h-3 animate-spin" />}
        {status}
      </div>
    </div>
  );
}