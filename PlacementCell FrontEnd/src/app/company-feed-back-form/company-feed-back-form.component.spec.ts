import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFeedBackFormComponent } from './company-feed-back-form.component';

describe('CompanyFeedBackFormComponent', () => {
  let component: CompanyFeedBackFormComponent;
  let fixture: ComponentFixture<CompanyFeedBackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFeedBackFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFeedBackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
