/**
 * Feedback Response DTO
 * Data Transfer Object for receiving feedback from the API
 */

import { FeedbackRequestDto } from './feedback-request.dto';

export interface FeedbackResponseDto extends FeedbackRequestDto {
  id?: string;
  studentId?: string;
  submittedAt?: Date;
  updatedAt?: Date;
}

