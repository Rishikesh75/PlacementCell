import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Radiobutton } from './radiobutton';

describe('Radiobutton', () => {
  let component: Radiobutton;
  let fixture: ComponentFixture<Radiobutton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Radiobutton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Radiobutton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
