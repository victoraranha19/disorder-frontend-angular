import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { API_URL_BASE } from '../shared/constants';
import { ICarteira } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class CarteirasService {
  private readonly ROTA_CARTEIRAS = '/carteiras';

  #httpClient = inject(HttpClient);

  listar() {
    return this.#httpClient.get<ICarteira[]>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}`);
  }

  carteiraPorId(id: string) {
    return this.#httpClient.get<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${id}`);
  }

  criar(carteira: Omit<ICarteira, 'id'>) {
    return this.#httpClient.post<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}`, carteira);
  }

  editar(carteira: ICarteira) {
    return this.#httpClient.put<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${carteira.id}`, carteira);
  }

  remover(id: number) {
    return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${id}`);
  }
}
