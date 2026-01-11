import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuarioLogado, IUsuarioLogin, IUsuarioRegistro } from '../shared/interfaces';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { API_URL_BASE } from '../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly ROTA_USUARIOS = '/usuarios';
  public usuarioLogado = signal<boolean>(this._verificaUsuarioLogado());

  #httpClient = inject(HttpClient);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  public registrar$(usuario: IUsuarioRegistro): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient.post(`${API_URL_BASE}${this.ROTA_USUARIOS}/register`, usuario).pipe(
      switchMap(() => this.logar$({ login: usuario.login, senha: usuario.senha })),
      catchError((err: Error) => {
        console.log(err);
        return of({ token: '' });
      }),
      tap(() => this.usuarioLogado.set(this._verificaUsuarioLogado()))
    );
  }

  public logar$(usuario: IUsuarioLogin): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient.post<IUsuarioLogado>(`${API_URL_BASE}${this.ROTA_USUARIOS}/login`, usuario).pipe(
      tap((usuarioLogado) => {
        localStorage.setItem('token', usuarioLogado.token);
        void this.#router.navigate([this.#activatedRoute.snapshot.queryParams['returnUrl'] ?? '/']);
      }),
      catchError((err) => {
        console.error(err);
        this.deslogar();
        return of({ token: '' });
      }),
      tap(() => this.usuarioLogado.set(this._verificaUsuarioLogado()))
    );
  }

  public deslogar(): void {
    localStorage.removeItem('token');
    this.usuarioLogado.set(this._verificaUsuarioLogado());
  }

  private _verificaUsuarioLogado() {
    return !!localStorage.getItem('token')?.length;
  }
}
