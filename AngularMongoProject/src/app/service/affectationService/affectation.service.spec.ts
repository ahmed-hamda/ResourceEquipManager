import { TestBed } from '@angular/core/testing';

import { AffectationService } from './affectaion.service';

describe('AffectationService', () => {
  let service: AffectationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
