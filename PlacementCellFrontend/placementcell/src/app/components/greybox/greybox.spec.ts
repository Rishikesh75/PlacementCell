import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Greybox } from './greybox';

describe('Greybox', () => {
  let component: Greybox;
  let fixture: ComponentFixture<Greybox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Greybox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Greybox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
