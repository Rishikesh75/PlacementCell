/**
 * Puzzle-Based Question Entity
 * Represents a puzzle or logical reasoning question
 */

import { BaseQuestion } from './question.entity';

export class PuzzleBasedQuestion extends BaseQuestion {
  constructor(
    question: string = '',
    difficulty: string = ''
  ) {
    super(question, difficulty);
  }
}

