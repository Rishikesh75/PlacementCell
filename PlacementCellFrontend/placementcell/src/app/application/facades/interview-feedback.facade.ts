/**
 * Interview Feedback Facade
 * Provides a simplified interface for feedback operations
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetFeedbacksOnCompanyUseCase, SubmitFeedbackUseCase } from '../use-cases';
import {  FeedbackOnCompanyMapper } from '../mappers';

@Injectable()
export class InterviewFeedbackFacade {
  constructor(
    private getFeedbacksOnCompanyUseCase: GetFeedbacksOnCompanyUseCase,
    private submitFeedbackUseCase: SubmitFeedbackUseCase,
    private feedbackMapper: FeedbackOnCompanyMapper
  ) {}

  /**
   * Get all feedbacks on company from /api/feedbackoncompany endpoint
   * Returns mapped data ready for display in feedback cards
   * @returns Observable of mapped feedback data array
   */
  getFeedbacksOnCompany(): Observable<any[]> {
    return this.getFeedbacksOnCompanyUseCase.execute().pipe(
      map(apiResponses => apiResponses.map(response => 
        this.feedbackMapper.mapFeedbackOnCompanyResponse(response)
      ))
    );
  }

  /**
   * Submit feedback data to the API
   * @param feedbackData The feedback data to submit
   * @returns Observable of the API response
   */
  submitFeedback(feedbackData: any): Observable<any> {
    return this.submitFeedbackUseCase.execute(feedbackData);
  }

}

