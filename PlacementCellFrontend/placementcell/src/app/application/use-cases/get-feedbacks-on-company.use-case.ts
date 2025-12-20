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

