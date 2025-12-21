/**
 * Interview Feedback Facade
 * Provides a simplified interface for feedback operations
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetFeedbacksOnCompanyUseCase, SubmitFeedbackUseCase } from '../use-cases';
import { FeedbackOnCompanyMapper } from '../mappers';
import { Feedback } from '../../domain/entities';

@Injectable()
export class InterviewFeedbackFacade {
  constructor(
    private getFeedbacksOnCompanyUseCase: GetFeedbacksOnCompanyUseCase,
    private submitFeedbackUseCase: SubmitFeedbackUseCase,
    private feedbackMapper: FeedbackOnCompanyMapper
  ) {}

  /**
   * Get all feedbacks on company from /api/feedbackoncompany endpoint
   * Returns domain entities ready for display in feedback cards
   * @returns Observable of Feedback domain entities array
   */
  getFeedbacksOnCompany(): Observable<Feedback[]> {
    return this.getFeedbacksOnCompanyUseCase.execute().pipe(
      map(apiResponses => apiResponses.map(response => 
        this.feedbackMapper.mapToFeedbackEntity(response)
      ))
    );
  }

  /**
   * Submit feedback data to the API
   * @param feedback The Feedback domain entity to submit
   * @returns Observable of the API response
   */
  submitFeedback(feedback: Feedback): Observable<any> {
    return this.submitFeedbackUseCase.execute(feedback);
  }

}

