/**
 * Feedback API Service
 * Low-level HTTP client for feedback endpoints
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackRequestDto, FeedbackResponseDto } from '../../application/dtos';
import { APP_CONSTANTS } from '../../core/constants';

@Injectable()
export class FeedbackApiService {
  private readonly apiUrl = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.FORMS}`;

  constructor(private http: HttpClient) {}

  /**
   * Post feedback to the API
   * @param data - The feedback request DTO
   * @returns Observable of feedback response DTO
   */
  postFeedback(data: FeedbackRequestDto): Observable<FeedbackResponseDto> {
    return this.http.post<FeedbackResponseDto>(this.apiUrl, data);
  }

  /**
   * Get feedback by ID
   * @param id - The feedback ID
   * @returns Observable of feedback response DTO
   */
  getFeedbackById(id: string): Observable<FeedbackResponseDto> {
    return this.http.get<FeedbackResponseDto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all feedbacks
   * @returns Observable of feedback response DTOs array
   */
  getAllFeedbacks(): Observable<FeedbackResponseDto[]> {
    return this.http.get<FeedbackResponseDto[]>(this.apiUrl);
  }

  /**
   * Get feedbacks by student ID
   * @param studentId - The student ID
   * @returns Observable of feedback response DTOs array
   */
  getFeedbacksByStudentId(studentId: string): Observable<FeedbackResponseDto[]> {
    return this.http.get<FeedbackResponseDto[]>(`${this.apiUrl}/student/${studentId}`);
  }

  /**
   * Get feedbacks by company name
   * @param companyName - The company name
   * @returns Observable of feedback response DTOs array
   */
  getFeedbacksByCompany(companyName: string): Observable<FeedbackResponseDto[]> {
    return this.http.get<FeedbackResponseDto[]>(`${this.apiUrl}/company/${companyName}`);
  }

  /**
   * Update feedback
   * @param id - The feedback ID
   * @param data - The feedback request DTO
   * @returns Observable of feedback response DTO
   */
  updateFeedback(id: string, data: FeedbackRequestDto): Observable<FeedbackResponseDto> {
    return this.http.put<FeedbackResponseDto>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete feedback
   * @param id - The feedback ID
   * @returns Observable of success status
   */
  deleteFeedback(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
