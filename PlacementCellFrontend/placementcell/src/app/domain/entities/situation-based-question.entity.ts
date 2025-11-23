/**
 * Situation-Based Question Entity
 * Represents an HR behavioral/situational question
 */

import { Question } from './question.entity';

export class SituationBasedQuestion extends Question {
  constructor(question: string = '') {
    super(question);
  }
}

