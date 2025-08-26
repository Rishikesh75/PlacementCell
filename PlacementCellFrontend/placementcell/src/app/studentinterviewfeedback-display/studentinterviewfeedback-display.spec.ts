import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinterviewfeedbackDisplay } from './studentinterviewfeedback-display';

describe('StudentinterviewfeedbackDisplay', () => {
  let component: StudentinterviewfeedbackDisplay;
  let fixture: ComponentFixture<StudentinterviewfeedbackDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentinterviewfeedbackDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentinterviewfeedbackDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
