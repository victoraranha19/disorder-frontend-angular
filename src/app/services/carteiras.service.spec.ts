import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CarteirasService } from './carteiras.service';

describe('CarteirasService', () => {
  let service: CarteirasService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CarteirasService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(CarteirasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
