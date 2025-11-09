import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedbackRepository } from '../../domain/interfaces/feedback-repository.interface';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';
import { FeedbackApiService } from '../api/feedback-api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackRepository implements IFeedbackRepository {
  constructor(private feedbackApi: FeedbackApiService) {}

  submitFeedback(data: FeedbackCardData): Observable<any> {
    return this.feedbackApi.postForm(data);
  }

  getFeedbacks(): Observable<FeedbackCardData[]> {
    return this.feedbackApi.getForms();
  }

  getFeedbackById(id: string): Observable<FeedbackCardData> {
    return this.feedbackApi.getFormById(id);
  }
}

