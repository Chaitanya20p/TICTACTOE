
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
  const [commentary, setCommentary] = useState("Hi! I'm Pookie. Let's play! ✨");
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setGameStatus("Your Turn");
    setIsThinking(false);
    setIsCommentaryLoading(false);
    setWinningCombo(null);
    setLastPlayerMove(undefined);
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
      // Silent error
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
  }, [isXNext, board, winningCombo, gameStatus, lastPlayerMove, difficulty, updateCommentary]);

  const isGameActive = board.some(cell => cell !== "");
  const hasWinner = !!checkWinner(board);

  return (
    <div className="flex flex-col items-center w-full scale-90 sm:scale-100">
      <div className="text-center mb-1 flex items-center justify-center gap-2">
        <Heart className="w-8 h-8 text-accent fill-current animate-float" />
        <h1 className="text-6xl sm:text-7xl font-black text-foreground tracking-tighter drop-shadow-sm">Pookie</h1>
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
      </div>

      <div className="mb-2 w-full flex justify-center">
         <Tabs 
            value={difficulty} 
            onValueChange={(v) => setDifficulty(v as Difficulty)} 
            className="w-full max-w-[140px]"
          >
          <TabsList className="grid w-full grid-cols-3 bg-white/80 border-2 border-primary/10 rounded-full h-6 p-1 pookie-shadow">
            <TabsTrigger value="Easy" disabled={isGameActive && !hasWinner} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-[7px] font-bold h-4">EZ</TabsTrigger>
            <TabsTrigger value="Medium" disabled={isGameActive && !hasWinner} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-[7px] font-bold h-4">MID</TabsTrigger>
            <TabsTrigger value="Hard" disabled={isGameActive && !hasWinner} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-[7px] font-bold h-4">PRO</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <GameStatus status={gameStatus} isThinking={isThinking} />

      <div className="grid grid-cols-3 gap-1.5 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] bg-white/40 backdrop-blur-md p-1.5 rounded-2xl pookie-shadow border-2 border-white relative overflow-hidden">
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

      <div className="w-full max-w-[260px] h-16">
        <AiCommentary commentary={commentary} isLoading={isCommentaryLoading} />
      </div>

      <div className="mt-2">
        <Button
          onClick={resetGame}
          variant="default"
          size="sm"
          className="rounded-full px-4 h-7 text-[10px] font-black uppercase tracking-tight bg-primary text-white pookie-shadow hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
