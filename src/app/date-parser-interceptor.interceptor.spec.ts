import { TestBed } from '@angular/core/testing';

import { DateParserInterceptorInterceptor } from './date-parser-interceptor.interceptor';

describe('DateParserInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DateParserInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DateParserInterceptorInterceptor = TestBed.inject(DateParserInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
