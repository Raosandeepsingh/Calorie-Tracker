import { TestBed } from '@angular/core/testing';

import { AuthServicsGuard } from './auth-servics.guard';

describe('AuthServicsGuard', () => {
  let guard: AuthServicsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthServicsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
