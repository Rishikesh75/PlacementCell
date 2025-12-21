/**
 * Get Feedbacks On Company Use Case
 * Fetches feedback data from /api/feedbackoncompany endpoint
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackApiService } from '../../infrastructure/api/feedback-api.service';
import { FeedbackOnCompanyResponseDto, FeedbackRequestDto } from '../dtos';
import { Feedback } from '../../domain/entities';
import { FeedbackOnCompanyMapper } from '../mappers';

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
  constructor(
    private feedbackApiService: FeedbackApiService,
    private mapper: FeedbackOnCompanyMapper
  ) {}

  /**
   * Execute the use case to submit feedback
   * @param feedback The Feedback domain entity to submit
   * @returns Observable of the API response
   */
  execute(feedback: Feedback): Observable<any> {
    // Map entity to API request DTO
    const requestDto: FeedbackOnCompanyResponseDto = this.mapper.mapToApiRequest(feedback);
    return this.feedbackApiService.submitFeedback(requestDto);
  }
}

