/**
 * Base Question Entity
 * Represents a generic question
 */

export class Question {
  constructor(public question: string = '') {}

  /**
   * Validate if question is not empty
   */
  isValid(): boolean {
    return this.question.trim() !== '';
  }

  /**
   * Get question length
   */
  getLength(): number {
    return this.question.length;
  }
}

/**
 * Base Question with Difficulty
 * Extends Question with difficulty level
 */
export class BaseQuestion extends Question {
  constructor(
    question: string = '',
    public difficulty: string = ''
  ) {
    super(question);
  }

  /**
   * Validate if question and difficulty are provided
   */
  override isValid(): boolean {
    return super.isValid() && this.difficulty.trim() !== '';
  }
}

