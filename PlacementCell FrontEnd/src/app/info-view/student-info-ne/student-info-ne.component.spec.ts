import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoNEComponent } from './student-info-ne.component';

describe('StudentInfoNEComponent', () => {
  let component: StudentInfoNEComponent;
  let fixture: ComponentFixture<StudentInfoNEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoNEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoNEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
