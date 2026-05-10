import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInput } from './number-input';

describe('NumberInput', () => {
  let component: NumberInput;
  let fixture: ComponentFixture<NumberInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
