import { TestBed } from '@angular/core/testing';

import { FeedbackFormstudent } from './feedback-formstudent';

describe('FeedbackFormstudent', () => {
  let service: FeedbackFormstudent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackFormstudent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
