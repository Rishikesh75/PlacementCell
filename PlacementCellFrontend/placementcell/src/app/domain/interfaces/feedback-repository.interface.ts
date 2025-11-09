import { Observable } from 'rxjs';
import { FeedbackCardData } from '../entities/feedback.entity';

export interface IFeedbackRepository {
  submitFeedback(data: FeedbackCardData): Observable<any>;
  getFeedbacks(): Observable<FeedbackCardData[]>;
  getFeedbackById(id: string): Observable<FeedbackCardData>;
}

