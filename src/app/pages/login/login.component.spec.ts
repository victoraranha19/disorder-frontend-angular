import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UsuariosService } from '../../services/usuarios.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let usuariosSSpy: jasmine.SpyObj<UsuariosService>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['url']);

    usuariosSSpy = jasmine.createSpyObj<UsuariosService>('UsuariosService', ['registrar$', 'logar$']);
    usuariosSSpy.registrar$.and.returnValue(of({ token: 'token' }));
    usuariosSSpy.logar$.and.returnValue(of({ token: 'token' }));

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: UsuariosService, useValue: usuariosSSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
