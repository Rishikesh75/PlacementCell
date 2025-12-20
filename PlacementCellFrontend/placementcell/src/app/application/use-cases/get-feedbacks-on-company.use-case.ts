/**
 * Get Feedbacks On Company Use Case
 * Fetches feedback data from /api/feedbackoncompany endpoint
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackApiService } from '../../infrastructure/api/feedback-api.service';
import { FeedbackOnCompanyResponseDto } from '../dtos';

@Injectable()
export class GetFeedbacksOnCompanyUseCase {
  constructor(private feedbackApiService: FeedbackApiService) {}

  /**
   * Execute the use case to get all feedbacks on company
   * @returns Observable of feedback on company response DTOs array
   */
  execute(): Observable<FeedbackOnCompanyResponseDto[]> {
    return this.feedbackApiService.getFeedbacksOnCompany();
  }
}

@Injectable()
export class SubmitFeedbackUseCase {
  constructor(private feedbackApiService: FeedbackApiService) {}

  /**
   * Execute the use case to submit feedback
   * @param feedbackData The feedback data to submit
   * @returns Observable of the API response
   */
  execute(feedbackData: any): Observable<any> {
    return this.feedbackApiService.submitFeedback(feedbackData);
  }
}

@Injectable()
export class GetAllFeedbacksUseCase {
  constructor(private feedbackApiService: FeedbackApiService) {}

  execute(): Observable<FeedbackOnCompanyResponseDto[]> {
    return this.feedbackApiService.getFeedbacksOnCompany();
  }
}

@Injectable()
export class GetFeedbacksByCompanyUseCase {
  constructor(private feedbackApiService: FeedbackApiService) {}

  execute(companyId: string): Observable<FeedbackOnCompanyResponseDto[]> {
    return this.feedbackApiService.getFeedbacksOnCompany();
  }
}