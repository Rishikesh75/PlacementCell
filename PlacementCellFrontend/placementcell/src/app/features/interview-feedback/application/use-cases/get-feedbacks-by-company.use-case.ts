/**
 * Get Feedbacks By Company Use Case
 * Business logic for retrieving feedbacks filtered by company
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository, FEEDBACK_REPOSITORY_TOKEN } from '../../domain/interfaces';

@Injectable()
export class GetFeedbacksByCompanyUseCase {
  constructor(@Inject(FEEDBACK_REPOSITORY_TOKEN) private feedbackRepository: IFeedbackRepository) {}

  /**
   * Execute the get feedbacks by company use case
   * @param companyName - The company name to filter by
   * @returns Observable of feedback array
   */
  execute(companyName: string): Observable<Feedback[]> {
    if (!companyName || companyName.trim() === '') {
      throw new Error('Company name is required');
    }

    return this.feedbackRepository.getFeedbacksByCompany(companyName);
  }
}

