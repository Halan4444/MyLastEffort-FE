import { TestBed } from '@angular/core/testing';

import { NavSublistService } from './nav-sublist.service';

describe('NavSublistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavSublistService = TestBed.get(NavSublistService);
    expect(service).toBeTruthy();
  });
});
