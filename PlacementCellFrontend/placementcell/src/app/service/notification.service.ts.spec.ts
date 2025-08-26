import { TestBed } from '@angular/core/testing';

import { NotificationServiceTs } from './notification.service.ts.js';

describe('NotificationServiceTs', () => {
  let service: NotificationServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
