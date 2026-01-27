import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuario, IUsuarioLogado, IUsuarioLogin, IUsuarioRegistro } from '../shared/interfaces';
import { Observable, switchMap, tap } from 'rxjs';
import { API_URL_BASE } from '../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly ROTA_USUARIOS = '/usuarios';
  public isUsuarioLogado = signal(false);

  #httpClient = inject(HttpClient);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  public registrar$(usuario: IUsuarioRegistro): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient
      .post(`${API_URL_BASE}${this.ROTA_USUARIOS}/registrar`, usuario)
      .pipe(switchMap(() => this.logar$({ email: usuario.email, senha: usuario.senha })));
  }

  public logar$(usuario: IUsuarioLogin): Observable<IUsuarioLogado> {
    this.deslogar();
    return this.#httpClient.post<IUsuarioLogado>(`${API_URL_BASE}${this.ROTA_USUARIOS}/login`, usuario).pipe(
      tap((usuarioLogado) => {
        localStorage.setItem('token', usuarioLogado.token);
        this.isUsuarioLogado.set(true);
        void this.#router.navigate([this.#activatedRoute.snapshot.queryParams['returnUrl'] ?? '/']);
      })
    );
  }

  public recuperarConta$(email: string | null | undefined): Observable<void> {
    return this.#httpClient.post<void>(`${API_URL_BASE}${this.ROTA_USUARIOS}/recuperar-conta`, { email });
  }

  public deslogar(irParaLogin = false, manterUrl = false) {
    localStorage.removeItem('token');
    this.isUsuarioLogado.set(false);
    if (irParaLogin) void this.#router.navigate(['/', 'home', 'login'], { queryParams: manterUrl ? { returnUrl: this.#router.url } : null });
  }

  public verificaUsuarioLogado() {
    const isUsuarioLogado = !!localStorage.getItem('token')?.length;
    this.isUsuarioLogado.set(isUsuarioLogado);
    return isUsuarioLogado;
  }

  public meuPerfil$(): Observable<IUsuario> {
    return this.#httpClient.get<IUsuario>(`${API_URL_BASE}${this.ROTA_USUARIOS}/meu-perfil`);
  }
}
