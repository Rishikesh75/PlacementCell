import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singleinput } from './singleinput';

describe('Singleinput', () => {
  let component: Singleinput;
  let fixture: ComponentFixture<Singleinput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singleinput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singleinput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
