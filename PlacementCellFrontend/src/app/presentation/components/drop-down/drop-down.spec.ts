import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDown } from './drop-down';

describe('DropDown', () => {
  let component: DropDown;
  let fixture: ComponentFixture<DropDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
