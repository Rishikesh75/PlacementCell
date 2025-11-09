/**
 * Unexpected Question Entity
 * Represents an unexpected or unusual HR question
 */

import { Question } from './question.entity';

export class UnexpectedQuestion extends Question {
  constructor(question: string = '') {
    super(question);
  }
}

