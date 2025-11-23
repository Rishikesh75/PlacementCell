/**
 * HR Round Entity
 * Represents HR interview round information
 */

import { SituationBasedQuestion } from './situation-based-question.entity';
import { UnexpectedQuestion } from './unexpected-question.entity';

export class HRRound {
  constructor(
    public situationBasedQuestions: SituationBasedQuestion[] = [],
    public unexpectedQuestions: UnexpectedQuestion[] = []
  ) {}

  /**
   * Validate if HR round details are provided
   */
  isValid(): boolean {
    // HR round questions are optional, so always valid
    return true;
  }

  /**
   * Get total number of HR questions
   */
  getTotalQuestions(): number {
    return this.situationBasedQuestions.length + this.unexpectedQuestions.length;
  }

  /**
   * Check if any HR questions were asked
   */
  hasQuestions(): boolean {
    return this.getTotalQuestions() > 0;
  }
}

