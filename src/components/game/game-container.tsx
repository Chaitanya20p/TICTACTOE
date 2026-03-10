"use client";

import { useState, useEffect, useCallback } from "react";
import { Cell } from "./cell";
import { GameStatus } from "./game-status";
import { AiCommentary } from "./ai-commentary";
import { Button } from "@/components/ui/button";
import { RotateCcw, Heart } from "lucide-react";
import { checkWinner, getBestMove, WIN_COMBINATIONS } from "@/lib/game-logic";
import { aiGameCommentary } from "@/ai/flows/ai-game-commentary-flow";

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

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setGameStatus("Your Turn");
    setIsThinking(false);
    setIsCommentaryLoading(false);
    setWinningCombo(null);
    setLastPlayerMove(undefined);
    setLastAiMove(undefined);
    setCommentary("Fresh start! Ready to lose? Just kidding! ✨");
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
      setGameStatus("AI Thinking...");
      setIsThinking(true);
      updateCommentary(newBoard, "AI Thinking...", index.toString(), undefined);
    }
  };

  const finishGame = (result: string, finalBoard: string[], playerM?: string, aiM?: string) => {
    let finalStatus = "";
    if (result === "X") {
      finalStatus = "You Win!";
      const combo = WIN_COMBINATIONS.find(c => finalBoard[c[0]] === "X" && finalBoard[c[0]] === finalBoard[c[1]] && finalBoard[c[0]] === finalBoard[c[2]]);
      if (combo) setWinningCombo(combo);
    } else if (result === "O") {
      finalStatus = "AI Wins!";
      const combo = WIN_COMBINATIONS.find(c => finalBoard[c[0]] === "O" && finalBoard[c[0]] === finalBoard[c[1]] && finalBoard[c[0]] === finalBoard[c[2]]);
      if (combo) setWinningCombo(combo);
    } else {
      finalStatus = "Draw!";
    }
    setGameStatus(finalStatus);
    setIsThinking(false);
    updateCommentary(finalBoard, finalStatus, playerM, aiM);
  };

  useEffect(() => {
    if (!isXNext && !winningCombo && gameStatus === "AI Thinking...") {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board);
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winningCombo, gameStatus, lastPlayerMove, updateCommentary]);

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-lg mx-auto min-h-[80vh]">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-8 h-8 text-accent fill-accent" />
          <h1 className="text-4xl font-bold text-foreground">Pookie Plays</h1>
        </div>
        <p className="text-muted-foreground font-medium">The cutest Tic-Tac-Toe ever!</p>
      </div>

      <GameStatus status={gameStatus} isThinking={isThinking} />

      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full aspect-square bg-primary/5 p-4 sm:p-6 rounded-[2rem] pookie-shadow border-4 border-white">
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
          className="rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-primary text-primary-foreground"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Restart Game
        </Button>
      </div>
    </div>
  );
}
