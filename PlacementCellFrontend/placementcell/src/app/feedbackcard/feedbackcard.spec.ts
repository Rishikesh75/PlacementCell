import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackcard } from './feedbackcard';

describe('Feedbackcard', () => {
  let component: Feedbackcard;
  let fixture: ComponentFixture<Feedbackcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedbackcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
