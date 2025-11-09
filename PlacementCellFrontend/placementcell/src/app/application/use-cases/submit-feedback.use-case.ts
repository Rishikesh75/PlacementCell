import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';
import { FeedbackRepository } from '../../infrastructure/repositories/feedback.repository';

@Injectable({
  providedIn: 'root'
})
export class SubmitFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  execute(feedbackData: FeedbackCardData): Observable<any> {
    // Add any business logic or validation here
    return this.feedbackRepository.submitFeedback(feedbackData);
  }
}

