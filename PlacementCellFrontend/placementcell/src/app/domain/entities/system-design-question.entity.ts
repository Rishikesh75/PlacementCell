/**
 * System Design Question Entity
 * Represents a system design question
 */

import { BaseQuestion } from './question.entity';

export class SystemDesignQuestion extends BaseQuestion {
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

