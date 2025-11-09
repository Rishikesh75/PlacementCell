/**
 * DSA Question Entity
 * Represents a Data Structures and Algorithms question
 */

import { BaseQuestion } from './question.entity';

export class DSAQuestion extends BaseQuestion {
  constructor(
    question: string = '',
    difficulty: string = '',
    public questionType: string = ''
  ) {
    super(question, difficulty);
  }

  /**
   * Validate if question, difficulty, and type are provided
   */
  override isValid(): boolean {
    return super.isValid() && this.questionType.trim() !== '';
  }
}

