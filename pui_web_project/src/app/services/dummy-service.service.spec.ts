import { TestBed } from '@angular/core/testing';

import { DummyServiceService } from './dummy-service.service';

describe('DummyServiceService', () => {
  let service: DummyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
