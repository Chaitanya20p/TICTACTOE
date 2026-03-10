"use client";

import { Sparkles } from "lucide-react";

interface AiCommentaryProps {
  commentary: string;
  isLoading: boolean;
}

export function AiCommentary({ commentary, isLoading }: AiCommentaryProps) {
  return (
    <div className="relative mt-2 w-full max-w-[240px] mx-auto">
      <div className="bg-white p-2 rounded-xl pookie-shadow border-2 border-primary/10 relative z-10 min-h-[44px] flex items-center">
        <div className="flex items-start gap-1.5 w-full">
          <div className="bg-primary/10 p-1 rounded-full shrink-0">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="flex gap-1 items-center h-full">
                <div className="w-1 h-1 rounded-full bg-primary dot-1" />
                <div className="w-1 h-1 rounded-full bg-primary dot-2" />
                <div className="w-1 h-1 rounded-full bg-primary dot-3" />
              </div>
            ) : (
              <p className="text-[10px] sm:text-[11px] font-bold text-foreground/70 leading-tight italic animate-pop-in line-clamp-2">
                "{commentary}"
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l-2 border-t-2 border-primary/10 rotate-45" />
    </div>
  );
}