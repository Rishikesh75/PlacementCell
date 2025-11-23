/**
 * Feedback Repository Interface
 * Defines the contract for feedback data access
 */

import { Observable } from 'rxjs';
import { Feedback } from '../entities/feedback.entity';

export interface IFeedbackRepository {
  /**
   * Submit a feedback form
   * @param feedback - The feedback entity to submit
   * @returns Observable of the submitted feedback
   */
  submitFeedback(feedback: Feedback): Observable<Feedback>;

  /**
   * Get feedback by ID
   * @param id - The feedback ID
   * @returns Observable of the feedback entity
   */
  getFeedbackById(id: string): Observable<Feedback>;

  /**
   * Get all feedbacks
   * @returns Observable of feedback array
   */
  getAllFeedbacks(): Observable<Feedback[]>;

  /**
   * Get feedbacks by student ID
   * @param studentId - The student ID
   * @returns Observable of feedback array
   */
  getFeedbacksByStudentId(studentId: string): Observable<Feedback[]>;

  /**
   * Get feedbacks by company name
   * @param companyName - The company name
   * @returns Observable of feedback array
   */
  getFeedbacksByCompany(companyName: string): Observable<Feedback[]>;

  /**
   * Update a feedback
   * @param id - The feedback ID
   * @param feedback - The updated feedback entity
   * @returns Observable of the updated feedback
   */
  updateFeedback(id: string, feedback: Feedback): Observable<Feedback>;

  /**
   * Delete a feedback
   * @param id - The feedback ID
   * @returns Observable of success status
   */
  deleteFeedback(id: string): Observable<boolean>;
}
