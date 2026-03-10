"use client";

import { Sparkles } from "lucide-react";

interface AiCommentaryProps {
  commentary: string;
  isLoading: boolean;
}

export function AiCommentary({ commentary, isLoading }: AiCommentaryProps) {
  return (
    <div className="relative mt-8 max-w-sm mx-auto animate-float">
      <div className="bg-white p-4 rounded-3xl pookie-shadow border-2 border-primary/20 relative z-10 min-h-[60px] flex items-center">
        <div className="flex items-start gap-3 w-full">
          <div className="bg-primary/10 p-2 rounded-full shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="flex gap-1 items-center h-full pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary dot-3" />
                <span className="text-xs text-muted-foreground ml-2 italic">Pookie is thinking...</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground/80 leading-relaxed italic animate-pop-in">
                "{commentary}"
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Speech bubble tail */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-primary/20 rotate-45" />
    </div>
  );
}
