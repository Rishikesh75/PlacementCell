import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';
import { FeedbackRepository } from '../../infrastructure/repositories/feedback.repository';

@Injectable({
  providedIn: 'root'
})
export class GetFeedbacksUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  execute(): Observable<FeedbackCardData[]> {
    return this.feedbackRepository.getFeedbacks();
  }
}

