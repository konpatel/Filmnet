import { TestBed } from '@angular/core/testing';

import { JwtRequestInterceptor } from './jwt-request.interceptor';

describe('JwtRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtRequestInterceptor = TestBed.inject(JwtRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
