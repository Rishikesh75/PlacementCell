/**
 * Feedback Repository Implementation
 * Implements the IFeedbackRepository interface
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository } from '../../domain/interfaces';
import { FeedbackApiService } from '../api';
import { FeedbackMapper } from '../../application/mappers';

@Injectable()
export class FeedbackRepository implements IFeedbackRepository {
  constructor(
    private feedbackApi: FeedbackApiService,
    private feedbackMapper: FeedbackMapper
  ) {}

  /**
   * Submit a feedback form
   */
  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const dto = this.feedbackMapper.toRequestDto(feedback);
    return this.feedbackApi.postFeedback(dto).pipe(
      map(responseDto => this.feedbackMapper.fromResponseDto(responseDto))
    );
  }

  /**
   * Get feedback by ID
   */
  getFeedbackById(id: string): Observable<Feedback> {
    return this.feedbackApi.getFeedbackById(id).pipe(
      map(dto => this.feedbackMapper.fromResponseDto(dto))
    );
  }

  /**
   * Get all feedbacks
   */
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.feedbackApi.getAllFeedbacks().pipe(
      map(dtos => dtos.map(dto => this.feedbackMapper.fromResponseDto(dto)))
    );
  }

  /**
   * Get feedbacks by student ID
   */
  getFeedbacksByStudentId(studentId: string): Observable<Feedback[]> {
    return this.feedbackApi.getFeedbacksByStudentId(studentId).pipe(
      map(dtos => dtos.map(dto => this.feedbackMapper.fromResponseDto(dto)))
    );
  }

  /**
   * Get feedbacks by company name
   */
  getFeedbacksByCompany(companyName: string): Observable<Feedback[]> {
    return this.feedbackApi.getFeedbacksByCompany(companyName).pipe(
      map(dtos => dtos.map(dto => this.feedbackMapper.fromResponseDto(dto)))
    );
  }

  /**
   * Update a feedback
   */
  updateFeedback(id: string, feedback: Feedback): Observable<Feedback> {
    const dto = this.feedbackMapper.toRequestDto(feedback);
    return this.feedbackApi.updateFeedback(id, dto).pipe(
      map(responseDto => this.feedbackMapper.fromResponseDto(responseDto))
    );
  }

  /**
   * Delete a feedback
   */
  deleteFeedback(id: string): Observable<boolean> {
    return this.feedbackApi.deleteFeedback(id).pipe(
      map(response => response.success)
    );
  }
}

