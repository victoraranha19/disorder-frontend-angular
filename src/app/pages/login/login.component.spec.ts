import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UsuariosService } from '../../services/usuarios.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let usuariosSSpy: jasmine.SpyObj<UsuariosService>;

  beforeEach(async () => {
    usuariosSSpy = jasmine.createSpyObj('UsuariosService', ['listar', 'logar']);
    usuariosSSpy.listar.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: UsuariosService, useValue: usuariosSSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
