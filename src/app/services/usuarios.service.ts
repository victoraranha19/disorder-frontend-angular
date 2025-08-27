import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { IUsuario } from '../shared/interfaces';
import { API_URL_BASE } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly ROTA_USUARIOS = '/usuarios';

  #httpClient = inject(HttpClient);

  logar(): void {
    localStorage.setItem('login', 'sim');
  }
  deslogar(): void {
    localStorage.clear();
  }

  isUsuarioLogado = (): boolean => !!localStorage.getItem('login');

  listar() {
    return this.#httpClient.get<IUsuario[]>(`${API_URL_BASE}${this.ROTA_USUARIOS}`);
  }

  usuarioPorId(id: string) {
    return this.#httpClient.get<IUsuario>(`${API_URL_BASE}${this.ROTA_USUARIOS}/${id}`);
  }

  criar(usuario: Omit<IUsuario, 'id'>) {
    return this.#httpClient.post<IUsuario>(`${API_URL_BASE}${this.ROTA_USUARIOS}`, usuario);
  }

  editar(usuario: IUsuario) {
    return this.#httpClient.put<IUsuario>(`${API_URL_BASE}${this.ROTA_USUARIOS}/${usuario.id}`, usuario);
  }

  remover(id: number) {
    return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_USUARIOS}/${id}`);
  }
}
