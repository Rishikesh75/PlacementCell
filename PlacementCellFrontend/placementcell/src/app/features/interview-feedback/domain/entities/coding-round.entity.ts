/**
 * Coding Round Entity
 * Represents coding round information
 */

import { Question } from './question.entity';

export class CodingRound {
  constructor(
    public codingPlatform: string = '',
    public codingDuration: string = '',
    public codingQuestions: Question[] = [],
    public codingDifficulty: string = '',
    public interviewMode: string = ''
  ) {}

  /**
   * Validate if coding round details are complete
   */
  isValid(): boolean {
    return (
      this.codingPlatform.trim() !== '' &&
      this.codingDuration.trim() !== '' &&
      this.codingQuestions.length > 0 &&
      this.codingDifficulty.trim() !== '' &&
      this.interviewMode.trim() !== ''
    );
  }

  /**
   * Get the number of coding questions
   */
  getQuestionCount(): number {
    return this.codingQuestions.length;
  }

  /**
   * Add a coding question
   */
  addQuestion(question: Question): void {
    this.codingQuestions.push(question);
  }

  /**
   * Remove a coding question by index
   */
  removeQuestion(index: number): void {
    if (index >= 0 && index < this.codingQuestions.length) {
      this.codingQuestions.splice(index, 1);
    }
  }
}

