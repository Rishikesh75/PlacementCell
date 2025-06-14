import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceDisplayComponent } from './experience-display.component';

describe('ExperienceDisplayComponent', () => {
  let component: ExperienceDisplayComponent;
  let fixture: ComponentFixture<ExperienceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
