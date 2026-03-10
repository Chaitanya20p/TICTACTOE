
"use client";

import { useState, useEffect, useCallback } from "react";
import { Cell } from "./cell";
import { GameStatus } from "./game-status";
import { AiCommentary } from "./ai-commentary";
import { Button } from "@/components/ui/button";
import { RotateCcw, Heart, Sparkles } from "lucide-react";
import { checkWinner, getBestMove, WIN_COMBINATIONS, type Difficulty } from "@/lib/game-logic";
import { aiGameCommentary } from "@/ai/flows/ai-game-commentary-flow";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GameContainer() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("Your Turn");
  const [isThinking, setIsThinking] = useState(false);
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
  const [commentary, setCommentary] = useState("Hi there! I'm Pookie. Let's play!");
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<string | undefined>(undefined);
  const [lastAiMove, setLastAiMove] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setGameStatus("Your Turn");
    setIsThinking(false);
    setIsCommentaryLoading(false);
    setWinningCombo(null);
    setLastPlayerMove(undefined);
    setLastAiMove(undefined);
    setCommentary("Fresh start! ✨");
  };

  const updateCommentary = useCallback(async (currentBoard: string[], currentStatus: string, playerM?: string, aiM?: string) => {
    setIsCommentaryLoading(true);
    try {
      const response = await aiGameCommentary({
        board: currentBoard,
        gameStatus: currentStatus,
        playerMove: playerM,
        aiMove: aiM,
      });
      setCommentary(response.commentary);
    } catch (error) {
      // Error handled silently for UX
    } finally {
      setIsCommentaryLoading(false);
    }
  }, []);

  const handleMove = async (index: number) => {
    if (board[index] !== "" || winningCombo || isThinking || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
    setLastPlayerMove(index.toString());
    
    const result = checkWinner(newBoard);
    if (result) {
      finishGame(result, newBoard, index.toString(), undefined);
    } else {
      setGameStatus("Thinking...");
      setIsThinking(true);
      updateCommentary(newBoard, "AI Thinking...", index.toString(), undefined);
    }
  };

  const finishGame = (result: string, finalBoard: string[], playerM?: string, aiM?: string) => {
    let finalStatus = "";
    if (result === "X") {
      finalStatus = "You Win! 🎉";
      const combo = WIN_COMBINATIONS.find(c => finalBoard[c[0]] === "X" && finalBoard[c[0]] === finalBoard[c[1]] && finalBoard[c[0]] === finalBoard[c[2]]);
      if (combo) setWinningCombo(combo);
    } else if (result === "O") {
      finalStatus = "Pookie Wins! ✨";
      const combo = WIN_COMBINATIONS.find(c => finalBoard[c[0]] === "O" && finalBoard[c[0]] === finalBoard[c[1]] && finalBoard[c[0]] === finalBoard[c[2]]);
      if (combo) setWinningCombo(combo);
    } else {
      finalStatus = "Draw! 🤝";
    }
    setGameStatus(finalStatus);
    setIsThinking(false);
    updateCommentary(finalBoard, finalStatus, playerM, aiM);
  };

  useEffect(() => {
    if (!isXNext && !winningCombo && gameStatus === "Thinking...") {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board, difficulty);
        const newBoard = [...board];
        newBoard[aiMove] = "O";
        setBoard(newBoard);
        setIsXNext(true);
        setIsThinking(false);
        setLastAiMove(aiMove.toString());

        const result = checkWinner(newBoard);
        if (result) {
          finishGame(result, newBoard, lastPlayerMove, aiMove.toString());
        } else {
          setGameStatus("Your Turn");
          updateCommentary(newBoard, "Your Turn", lastPlayerMove, aiMove.toString());
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winningCombo, gameStatus, lastPlayerMove, updateCommentary, difficulty]);

  const isGameActive = board.some(cell => cell !== "");
  const hasWinner = !!checkWinner(board);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center mb-1 relative">
        <div className="absolute -top-4 -right-10 text-accent animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-10 h-10 text-accent fill-current animate-float" />
          <h1 className="text-7xl sm:text-8xl font-black text-foreground tracking-tighter drop-shadow-md">Pookie</h1>
        </div>
      </div>

      <div className="mb-2 w-full flex flex-col items-center scale-90 sm:scale-100">
         <Tabs 
            value={difficulty} 
            onValueChange={(v) => setDifficulty(v as Difficulty)} 
            className="w-full max-w-[160px]"
          >
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border-2 border-primary/10 rounded-full h-7 p-1 pookie-shadow">
            <TabsTrigger 
              value="Easy" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-[7px] font-bold uppercase h-5"
            >
              Easy
            </TabsTrigger>
            <TabsTrigger 
              value="Medium" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-[7px] font-bold uppercase h-5"
            >
              Mid
            </TabsTrigger>
            <TabsTrigger 
              value="Hard" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-[7px] font-bold uppercase h-5"
            >
              Hard
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <GameStatus status={gameStatus} isThinking={isThinking} />

      <div className="grid grid-cols-3 gap-2 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] bg-white/40 backdrop-blur-md p-1.5 rounded-[1.5rem] pookie-shadow border-2 border-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none pookie-gradient" />
        
        {board.map((val, idx) => (
          <Cell
            key={idx}
            value={val}
            onClick={() => handleMove(idx)}
            disabled={!isXNext || !!winningCombo || isThinking}
            isWinner={winningCombo?.includes(idx) || false}
          />
        ))}
      </div>

      <div className="w-full max-w-[280px] sm:max-w-[300px]">
        <AiCommentary commentary={commentary} isLoading={isCommentaryLoading} />
      </div>

      <div className="mt-2">
        <Button
          onClick={resetGame}
          variant="default"
          size="sm"
          className="rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-tight shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 bg-primary text-primary-foreground border-b-2 border-primary/40 h-7"
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
