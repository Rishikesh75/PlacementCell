import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponayReviweComponentComponent } from './componay-reviwe-component.component';

describe('ComponayReviweComponentComponent', () => {
  let component: ComponayReviweComponentComponent;
  let fixture: ComponentFixture<ComponayReviweComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponayReviweComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponayReviweComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
