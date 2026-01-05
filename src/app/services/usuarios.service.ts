import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuarioLogado, IUsuarioLogin, IUsuarioRegistro } from '../shared/interfaces';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly ROTA_LOGIN = '/auth';

  public token = signal<string>('');

  #httpClient = inject(HttpClient);

  public registrar$(usuario: IUsuarioRegistro): Observable<IUsuarioLogado> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.#httpClient.post(`${this.ROTA_LOGIN}/register`, usuario, { headers }).pipe(
      switchMap(() => this.logar$({ login: usuario.login, senha: usuario.senha })),
      catchError((err: Error) => {
        console.log(err);
        return of({ token: '' });
      })
    );
  }

  public logar$(usuario: IUsuarioLogin): Observable<IUsuarioLogado> {
    return this.#httpClient.post<IUsuarioLogado>(`${this.ROTA_LOGIN}/login`, usuario).pipe(
      tap((usuarioLogado) => {
        this.token.set(usuarioLogado.token);
      }),
      catchError((err) => {
        console.error(err);
        this.deslogar();
        return of({ token: '' });
      })
    );
  }

  public deslogar(): void {
    this.token.set('');
  }

  isUsuarioLogado = (): boolean => !!this.token().length;
}
