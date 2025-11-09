import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';

@Injectable({
  providedIn: 'root'
})
export class FeedbackApiService {
  private apiUrl = 'http://localhost:3000/api/forms'; // backend endpoint

  constructor(private http: HttpClient) {}

  /**
   * Submit feedback form to the backend API
   */
  postForm(data: FeedbackCardData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  /**
   * Get all feedback forms
   */
  getForms(): Observable<FeedbackCardData[]> {
    return this.http.get<FeedbackCardData[]>(this.apiUrl);
  }

  /**
   * Get a specific feedback form by ID
   */
  getFormById(id: string): Observable<FeedbackCardData> {
    return this.http.get<FeedbackCardData>(`${this.apiUrl}/${id}`);
  }
}

