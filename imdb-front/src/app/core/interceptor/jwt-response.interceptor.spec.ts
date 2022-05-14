import { TestBed } from '@angular/core/testing';

import { JwtResponseInterceptor } from './jwt-response.interceptor';

describe('JwtResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtResponseInterceptor = TestBed.inject(JwtResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
