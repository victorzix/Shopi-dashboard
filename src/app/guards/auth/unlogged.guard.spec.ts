import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unloggedGuard } from './unlogged.guard';

describe('unloggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unloggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
