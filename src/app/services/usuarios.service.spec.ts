import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './usuarios.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

describe('UsuariosService', () => {
  let service: UsuariosService;

  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', [], { snapshot: mockSnapshot });

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    routerSpy.navigate.and.resolveTo(true);

    TestBed.configureTestingModule({
      providers: [
        UsuariosService,
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

const mockSnapshot: ActivatedRouteSnapshot = {
  queryParams: { returnUrl: '/home/carteira' }
} as unknown as ActivatedRouteSnapshot;
