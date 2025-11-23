/**
 * Technical Round Entity
 * Represents technical interview round information
 */

import { DSAQuestion } from './dsa-question.entity';
import { ComputerCoreQuestion } from './computer-core-question.entity';
import { SystemDesignQuestion } from './system-design-question.entity';
import { PuzzleBasedQuestion } from './puzzle-based-question.entity';

export class TechnicalRound {
  constructor(
    public interviewMode: string = '',
    public duration: string = '',
    public dsaQuestions: DSAQuestion[] = [],
    public computerCoreQuestions: ComputerCoreQuestion[] = [],
    public systemDesignQuestions: SystemDesignQuestion[] = [],
    public puzzleBasedQuestions: PuzzleBasedQuestion[] = []
  ) {}

  /**
   * Validate if technical round details are complete
   */
  isValid(): boolean {
    return (
      this.interviewMode.trim() !== '' &&
      this.duration.trim() !== '' &&
      this.getTotalQuestions() > 0
    );
  }

  /**
   * Get total number of technical questions
   */
  getTotalQuestions(): number {
    return (
      this.dsaQuestions.length +
      this.computerCoreQuestions.length +
      this.systemDesignQuestions.length +
      this.puzzleBasedQuestions.length
    );
  }

  /**
   * Check if round includes DSA questions
   */
  hasDSAQuestions(): boolean {
    return this.dsaQuestions.length > 0;
  }

  /**
   * Check if round includes Core CS questions
   */
  hasCoreCSQuestions(): boolean {
    return this.computerCoreQuestions.length > 0;
  }

  /**
   * Check if round includes System Design questions
   */
  hasSystemDesignQuestions(): boolean {
    return this.systemDesignQuestions.length > 0;
  }

  /**
   * Check if round includes Puzzle questions
   */
  hasPuzzleQuestions(): boolean {
    return this.puzzleBasedQuestions.length > 0;
  }
}

