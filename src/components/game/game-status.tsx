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
    <div className="mb-8 text-center space-y-2">
      <div className={cn(
        "inline-flex items-center gap-2 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300",
        isWin ? "bg-accent text-accent-foreground scale-110 shadow-lg" : "bg-primary/10 text-primary"
      )}>
        {isThinking && <Loader2 className="w-5 h-5 animate-spin" />}
        {status}
      </div>
    </div>
  );
}
