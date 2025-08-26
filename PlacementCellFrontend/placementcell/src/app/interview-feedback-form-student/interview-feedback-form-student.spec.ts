import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackFormStudent } from './interview-feedback-form-student';

describe('InterviewFeedbackFormStudent', () => {
  let component: InterviewFeedbackFormStudent;
  let fixture: ComponentFixture<InterviewFeedbackFormStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewFeedbackFormStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewFeedbackFormStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
