import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessoriaComponent } from './assessoria.component';
import { UsuariosService } from '../../services/usuarios.service';
import { of } from 'rxjs';
import { usuarioMock } from '../../shared/mockTests';

describe('AssessoriaComponent', () => {
  let component: AssessoriaComponent;
  let fixture: ComponentFixture<AssessoriaComponent>;

  let usuarioSSPy: jasmine.SpyObj<UsuariosService>;

  beforeEach(async () => {
    usuarioSSPy = jasmine.createSpyObj<UsuariosService>('UsuariosService', ['meuPerfil$']);
    usuarioSSPy.meuPerfil$.and.returnValue(of(usuarioMock));

    await TestBed.configureTestingModule({
      imports: [AssessoriaComponent],
      providers: [{ provide: UsuariosService, useValue: usuarioSSPy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
