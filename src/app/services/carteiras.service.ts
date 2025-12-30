import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { API_URL_BASE } from '../shared/constants';
import { ICarteira } from '../shared/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarteirasService {
  // private readonly ROTA_CARTEIRAS = '/carteiras';
  // #httpClient = inject(HttpClient);
  // listar() {
  //   return this.#httpClient.get<ICarteira[]>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}`);
  // }
  // carteiraPorId(id: string) {
  //   return this.#httpClient.get<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${id}`);
  // }
  // criar(carteira: Omit<ICarteira, 'id'>) {
  //   return this.#httpClient.post<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}`, carteira);
  // }
  // editar(carteira: ICarteira) {
  //   return this.#httpClient.put<ICarteira>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${carteira.id}`, carteira);
  // }
  // remover(id: number) {
  //   return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_CARTEIRAS}/${id}`);
  // }

  private _carteiras = signal<ICarteira[]>([]);
  public listar(): Observable<ICarteira[]> {
    return of(this._carteiras().filter(c => c.ativo).sort((a,b) => a.id - b.id));
  }
  public criar(carteira: Omit<ICarteira, 'id'>): Observable<number> {
    const newId = this._carteiras().length + 1;
    this._carteiras.update((value) => {
      const novaCarteira: ICarteira = { ...carteira, id: newId };
      return value.concat(novaCarteira);
    });
    return of(newId);
  }
  public editar(carteira: ICarteira): Observable<null> {
    const id = carteira.id;
    this._carteiras.update((value) => {
      return value.filter((c) => c.id !== id).concat(carteira);
    });
    return of(null);
  }
  public excluir(carteira: ICarteira): Observable<null> {
    carteira.ativo = false;
    const id = carteira.id;
    this._carteiras.update((value) => {
      return value.filter((c) => c.id !== id).concat(carteira);
    });
    return of(null);
  }
}
