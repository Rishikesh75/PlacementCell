import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponentComponent } from './year-component.component';

describe('YearComponentComponent', () => {
  let component: YearComponentComponent;
  let fixture: ComponentFixture<YearComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
