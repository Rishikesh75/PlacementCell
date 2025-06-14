import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewDisplayComponent } from './company-review-display.component';

describe('CompanyReviewDisplayComponent', () => {
  let component: CompanyReviewDisplayComponent;
  let fixture: ComponentFixture<CompanyReviewDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyReviewDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReviewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
