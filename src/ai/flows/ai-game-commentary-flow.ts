'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating engaging and fun commentary
 * for a Tic-Tac-Toe game based on the current game state and moves.
 *
 * - aiGameCommentary - A function that generates AI commentary for the game.
 * - AiGameCommentaryInput - The input type for the aiGameCommentary function.
 * - AiGameCommentaryOutput - The return type for the aiGameCommentary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGameCommentaryInputSchema = z.object({
  board: z
    .array(z.string())
    .length(9)
    .describe(
      'The current state of the Tic-Tac-Toe board as a 1D array of 9 strings. Empty cells are "", player cells are "X", AI cells are "O".'
    ),
  playerMove: z
    .string()
    .optional()
    .describe(
      'The index of the player\'s last move (0-8) as a string, if any. e.g., "0", "1".'
    ),
  aiMove: z
    .string()
    .optional()
    .describe(
      'The index of the AI\'s last move (0-8) as a string, if any. e.g., "0", "1".'
    ),
  gameStatus: z
    .string()
    .describe(
      'The current status of the game (e.g., "Your Turn", "AI Thinking...", "You Win", "AI Wins", "Draw", "Game Over").'
    ),
});
export type AiGameCommentaryInput = z.infer<typeof AiGameCommentaryInputSchema>;

const AiGameCommentaryOutputSchema = z.object({
  commentary: z
    .string()
    .describe('A lighthearted, encouraging, or humorous comment about the game state.'),
});
export type AiGameCommentaryOutput = z.infer<
  typeof AiGameCommentaryOutputSchema
>;

export async function aiGameCommentary(
  input: AiGameCommentaryInput
): Promise<AiGameCommentaryOutput> {
  return aiGameCommentaryFlow(input);
}

const aiGameCommentaryPrompt = ai.definePrompt({
  name: 'aiGameCommentaryPrompt',
  input: {schema: AiGameCommentaryInputSchema},
  output: {schema: AiGameCommentaryOutputSchema},
  prompt: `You are Pookie, a cute, playful, and slightly sassy Tic-Tac-Toe AI companion.\nYour goal is to provide lighthearted, encouraging, or humorous commentary about the Tic-Tac-Toe game based on the current board state and recent moves.\nKeep your responses short and engaging, between 1-2 sentences. Do not be overly complex or serious. Use emojis sparingly.\n\nCurrent Game Status: {{{gameStatus}}}\n\nHere is the current board. Empty cells are represented by "" (empty string), player 'X', AI 'O':\n{{{board.[0]}}} | {{{board.[1]}}} | {{{board.[2]}}}\n---+---+---\n{{{board.[3]}}} | {{{board.[4]}}} | {{{board.[5]}}}\n---+---+---\n{{{board.[6]}}} | {{{board.[7]}}} | {{{board.[8]}}}\n\n{{#if playerMove}}\nPlayer 'X' just made a move to cell number {{{playerMove}}}.\n{{/if}}\n{{#if aiMove}}\nAI 'O' just made a move to cell number {{{aiMove}}}.\n{{/if}}\n\nBased on this information, provide a fun and short commentary.`,
});

const aiGameCommentaryFlow = ai.defineFlow(
  {
    name: 'aiGameCommentaryFlow',
    inputSchema: AiGameCommentaryInputSchema,
    outputSchema: AiGameCommentaryOutputSchema,
  },
  async input => {
    const {output} = await aiGameCommentaryPrompt(input);
    if (!output) {
      throw new Error('Failed to generate commentary.');
    }
    return output;
  }
);
