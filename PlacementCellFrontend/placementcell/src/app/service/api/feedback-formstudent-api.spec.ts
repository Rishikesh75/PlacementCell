import { TestBed } from '@angular/core/testing';

import { FeedbackFormstudentApi } from './feedback-formstudent-api';

describe('FeedbackFormstudentApi', () => {
  let service: FeedbackFormstudentApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackFormstudentApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
