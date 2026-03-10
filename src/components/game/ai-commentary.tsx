
"use client";

import { Sparkles } from "lucide-react";

interface AiCommentaryProps {
  commentary: string;
  isLoading: boolean;
}

export function AiCommentary({ commentary, isLoading }: AiCommentaryProps) {
  return (
    <div className="relative w-full">
      <div className="bg-white p-3 rounded-2xl pookie-shadow border-2 border-primary/10 relative z-10 min-h-[50px] flex items-center">
        <div className="flex items-start gap-2 w-full">
          <div className="bg-primary/10 p-1.5 rounded-full shrink-0">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="flex gap-1.5 items-center h-full pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-3" />
              </div>
            ) : (
              <p className="text-[12px] sm:text-[14px] font-bold text-foreground/70 leading-snug italic animate-pop-in">
                "{commentary}"
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l-2 border-t-2 border-primary/10 rotate-45" />
    </div>
  );
}
