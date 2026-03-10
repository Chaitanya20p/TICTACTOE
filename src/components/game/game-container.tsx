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
    setCommentary("Fresh start! Ready for some fun? ✨");
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
      console.error("Failed to fetch commentary:", error);
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
      setGameStatus("Pookie is thinking...");
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
      finalStatus = "It's a Draw! 🤝";
    }
    setGameStatus(finalStatus);
    setIsThinking(false);
    updateCommentary(finalBoard, finalStatus, playerM, aiM);
  };

  useEffect(() => {
    if (!isXNext && !winningCombo && gameStatus === "Pookie is thinking...") {
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
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winningCombo, gameStatus, lastPlayerMove, updateCommentary, difficulty]);

  const isGameActive = board.some(cell => cell !== "");
  const hasWinner = !!checkWinner(board);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="text-center mb-8 relative">
        <div className="absolute -top-6 -right-6 text-accent animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute -bottom-4 -left-6 text-primary animate-bounce">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-accent/20 p-2 rounded-2xl">
            <Heart className="w-8 h-8 text-accent fill-accent" />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Pookie Plays</h1>
        </div>
        <p className="text-muted-foreground font-semibold">Cute. Sassy. Unbeatable? 💖</p>
      </div>

      <div className="mb-8 w-full flex flex-col items-center gap-4">
         <Tabs 
            value={difficulty} 
            onValueChange={(v) => setDifficulty(v as Difficulty)} 
            className="w-full max-w-[280px]"
          >
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border-2 border-primary/10 rounded-full h-11 p-1 pookie-shadow">
            <TabsTrigger 
              value="Easy" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-xs font-bold uppercase tracking-wider"
            >
              Easy
            </TabsTrigger>
            <TabsTrigger 
              value="Medium" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-xs font-bold uppercase tracking-wider"
            >
              Mid
            </TabsTrigger>
            <TabsTrigger 
              value="Hard" 
              disabled={isGameActive && !hasWinner} 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-xs font-bold uppercase tracking-wider"
            >
              Hard
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <GameStatus status={gameStatus} isThinking={isThinking} />

      <div className="grid grid-cols-3 gap-4 w-full aspect-square bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] pookie-shadow border-4 border-white relative overflow-hidden">
        {/* Board background subtle texture */}
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

      <AiCommentary commentary={commentary} isLoading={isCommentaryLoading} />

      <div className="mt-12">
        <Button
          onClick={resetGame}
          variant="default"
          size="lg"
          className="rounded-full px-10 py-7 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-primary text-primary-foreground border-b-4 border-primary/30"
        >
          <RotateCcw className="mr-3 h-6 w-6" />
          Play Again
        </Button>
      </div>
    </div>
  );
}