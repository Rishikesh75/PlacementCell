import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcompanyAdminComponent } from './hcompany-admin.component';

describe('HcompanyAdminComponent', () => {
  let component: HcompanyAdminComponent;
  let fixture: ComponentFixture<HcompanyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcompanyAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
