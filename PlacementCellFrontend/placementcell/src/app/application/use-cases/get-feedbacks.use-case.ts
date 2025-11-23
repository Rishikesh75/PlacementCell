import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository, FEEDBACK_REPOSITORY_TOKEN } from '../../domain/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetFeedbacksUseCase {
  constructor(@Inject(FEEDBACK_REPOSITORY_TOKEN) private feedbackRepository: IFeedbackRepository) {}

  execute(): Observable<Feedback[]> {
    return this.feedbackRepository.getAllFeedbacks();
  }
}

