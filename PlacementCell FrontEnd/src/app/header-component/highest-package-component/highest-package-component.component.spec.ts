import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestPackageComponentComponent } from './highest-package-component.component';

describe('HighestPackageComponentComponent', () => {
  let component: HighestPackageComponentComponent;
  let fixture: ComponentFixture<HighestPackageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestPackageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestPackageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
