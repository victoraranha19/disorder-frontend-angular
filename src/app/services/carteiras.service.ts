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

  addCarteira(carteira: Omit<ICarteira, 'id'>) {
    return this.#httpClient.post<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}`, carteira);
  }

  // editCarteira(carteira: ICarteira) {
  //   return this.#httpClient.patch<ICarteira>(`${this.URI_CARTEIRAS}/${carteira.id}`, carteira);
  // }

  // removeCarteira(carteira: ICarteira) {
  //   return this.#httpClient.delete<ICarteira>(`${this.URI_CARTEIRAS}/${carteira.id}`);
  // }
}
