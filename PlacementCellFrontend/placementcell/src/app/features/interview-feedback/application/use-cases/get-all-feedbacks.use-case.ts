/**
 * Get All Feedbacks Use Case
 * Business logic for retrieving all interview feedbacks
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository, FEEDBACK_REPOSITORY_TOKEN } from '../../domain/interfaces';

@Injectable()
export class GetAllFeedbacksUseCase {
  constructor(@Inject(FEEDBACK_REPOSITORY_TOKEN) private feedbackRepository: IFeedbackRepository) {}

  /**
   * Execute the get all feedbacks use case
   * @returns Observable of feedback array
   */
  execute(): Observable<Feedback[]> {
    return this.feedbackRepository.getAllFeedbacks();
  }
}

