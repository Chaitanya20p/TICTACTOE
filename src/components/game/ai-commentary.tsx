"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface AiCommentaryProps {
  commentary: string;
  isThinking: boolean;
}

export function AiCommentary({ commentary, isThinking }: AiCommentaryProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isThinking) {
      setDisplayText("Pookie is thinking...");
      return;
    }
    
    setDisplayText(commentary);
  }, [commentary, isThinking]);

  if (!displayText) return null;

  return (
    <div className="relative mt-8 max-w-sm mx-auto animate-float">
      <div className="bg-white p-4 rounded-3xl pookie-shadow border-2 border-primary/20 relative z-10">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground/80 leading-relaxed italic">
            "{displayText}"
          </p>
        </div>
      </div>
      {/* Speech bubble tail */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-primary/20 rotate-45" />
    </div>
  );
}
