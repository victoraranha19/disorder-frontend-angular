import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsuarioLogado, IUsuarioLogin, IUsuarioRegistro } from '../shared/interfaces';
import { Observable, switchMap, tap } from 'rxjs';
import { API_URL_BASE } from '../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly ROTA_USUARIOS = '/usuarios';

  #httpClient = inject(HttpClient);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  public registrar$(usuario: IUsuarioRegistro): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient
      .post(`${API_URL_BASE}${this.ROTA_USUARIOS}/register`, usuario)
      .pipe(switchMap(() => this.logar$({ login: usuario.login, senha: usuario.senha })));
  }

  public logar$(usuario: IUsuarioLogin): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient.post<IUsuarioLogado>(`${API_URL_BASE}${this.ROTA_USUARIOS}/login`, usuario).pipe(
      tap((usuarioLogado) => {
        localStorage.setItem('token', usuarioLogado.token);
        void this.#router.navigate([this.#activatedRoute.snapshot.queryParams['returnUrl'] ?? '/']);
      })
    );
  }

  public deslogar(): void {
    localStorage.removeItem('token');
  }

  public verificaUsuarioLogado() {
    console.log('verificaUsuarioLogado called', !!localStorage.getItem('token')?.length);
    return !!localStorage.getItem('token')?.length;
  }
}
