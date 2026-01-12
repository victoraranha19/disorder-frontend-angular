import { inject, Injectable } from '@angular/core';
import { ICategoria } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private readonly ROTA_CATEGORIAS = '/categorias';

  #httpClient = inject(HttpClient);

  listar$() {
    return this.#httpClient.get<ICategoria[]>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}`);
  }
  criar$(categoria: Omit<ICategoria, 'id'>) {
    return this.#httpClient.post<ICategoria>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}`, categoria);
  }
  editar$(categoria: ICategoria) {
    return this.#httpClient.put<ICategoria>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}/${categoria.id}`, categoria);
  }
  remover$(id: number) {
    return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}/${id}`);
  }
}
