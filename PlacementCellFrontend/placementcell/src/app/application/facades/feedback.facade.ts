import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback.use-case';
import { GetFeedbacksUseCase } from '../use-cases/get-feedbacks.use-case';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFacade {
  constructor(
    private submitFeedbackUseCase: SubmitFeedbackUseCase,
    private getFeedbacksUseCase: GetFeedbacksUseCase
  ) {}

  submitFeedback(data: FeedbackCardData): Observable<any> {
    return this.submitFeedbackUseCase.execute(data);
  }

  getAllFeedbacks(): Observable<FeedbackCardData[]> {
    return this.getFeedbacksUseCase.execute();
  }
}

