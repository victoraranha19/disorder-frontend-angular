import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransacoesService } from './transacoes.service';

describe('TransacoesService', () => {
  let service: TransacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TransacoesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(TransacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
