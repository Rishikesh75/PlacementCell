import { TestBed } from '@angular/core/testing';

import { AlumniDetailsService } from './alumni-details.service';

describe('AlumniDetailsService', () => {
  let service: AlumniDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumniDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
