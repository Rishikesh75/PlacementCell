/**
 * Submit Feedback Use Case
 * Business logic for submitting interview feedback
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository, FEEDBACK_REPOSITORY_TOKEN } from '../../domain/interfaces';

@Injectable()
export class SubmitFeedbackUseCase {
  constructor(@Inject(FEEDBACK_REPOSITORY_TOKEN) private feedbackRepository: IFeedbackRepository) {}

  /**
   * Execute the submit feedback use case
   * @param feedback - The feedback entity to submit
   * @returns Observable of the submitted feedback
   */
  execute(feedback: Feedback): Observable<Feedback> {
    // Validate feedback before submission
    if (!feedback.isValid()) {
      throw new Error('Invalid feedback data. Please fill all required fields.');
    }

    // Submit via repository
    return this.feedbackRepository.submitFeedback(feedback);
  }
}
