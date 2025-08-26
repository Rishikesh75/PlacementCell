import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginpage } from './loginpage';

describe('Loginpage', () => {
  let component: Loginpage;
  let fixture: ComponentFixture<Loginpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
