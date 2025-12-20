/**
 * Feedback API Service
 * Low-level HTTP client for feedback endpoints
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  FeedbackOnCompanyResponseDto } from '../../application/dtos';
import { APP_CONSTANTS } from '../../core/constants';

@Injectable()
export class FeedbackApiService {
  private readonly apiUrl = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.FORMS}`;

  constructor(private http: HttpClient) {}

  /**
   * Get all feedbacks on company from /api/feedbackoncompany endpoint
   * @returns Observable of feedback on company response DTOs array
   */
  getFeedbacksOnCompany(): Observable<FeedbackOnCompanyResponseDto[]> {
    const url = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.FEEDBACK_ON_COMPANY}`;
    return this.http.get<FeedbackOnCompanyResponseDto[]>(url);
  }

  /**
   * Submit feedback to the API
   * @param feedbackData The feedback data to submit
   * @returns Observable of the API response
   */
  submitFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, feedbackData);
  }
}
