/**
 * Computer Core Question Entity
 * Represents a Computer Science core subject question (OS, DBMS, Networks, etc.)
 */

import { BaseQuestion } from './question.entity';

export class ComputerCoreQuestion extends BaseQuestion {
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

