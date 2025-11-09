import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationSelector } from './duration-selector';

describe('DurationSelector', () => {
  let component: DurationSelector;
  let fixture: ComponentFixture<DurationSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DurationSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DurationSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
