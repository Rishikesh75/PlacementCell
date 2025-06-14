import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoViewAdminComponent } from './info-view-admin.component';

describe('InfoViewAdminComponent', () => {
  let component: InfoViewAdminComponent;
  let fixture: ComponentFixture<InfoViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoViewAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
