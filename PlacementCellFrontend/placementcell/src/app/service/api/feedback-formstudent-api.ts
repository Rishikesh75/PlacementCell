import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormstudentApi {
  private apiUrl = 'http://localhost:3000/api/forms'; // backend endpoint

  constructor(private http: HttpClient) {}

  // Raw HTTP call (low-level)
  postForm(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
