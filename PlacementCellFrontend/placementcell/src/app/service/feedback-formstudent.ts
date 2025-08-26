import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackFormstudentApi } from './api/feedback-formstudent-api';
@Injectable({
  providedIn: 'root'
})
export class FeedbackFormstudent {
  constructor( private formApi: FeedbackFormstudentApi) { }

  submitForm(data: any): Observable<any> {
    return this.formApi.postForm(data);
  }
}
