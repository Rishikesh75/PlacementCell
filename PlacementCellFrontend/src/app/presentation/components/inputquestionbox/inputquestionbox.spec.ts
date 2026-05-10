import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputquestionbox } from './inputquestionbox';

describe('Inputquestionbox', () => {
  let component: Inputquestionbox;
  let fixture: ComponentFixture<Inputquestionbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputquestionbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputquestionbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
