import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { API_URL_BASE } from '../shared/constants';
import { ICarteira, ICategoria } from '../shared/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  // private readonly ROTA_CATEGORIAS = '/categorias';
  // #httpClient = inject(HttpClient);
  // listar() {
  //   return this.#httpClient.get<ICategoria[]>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}`);
  // }
  // categoriaPorId(id: string) {
  //   return this.#httpClient.get<ICategoria>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}/${id}`);
  // }
  // criar(categoria: Omit<ICategoria, 'id'>) {
  //   return this.#httpClient.post<ICategoria>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}`, categoria);
  // }
  // editar(categoria: ICategoria) {
  //   return this.#httpClient.put<ICategoria>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}/${categoria.id}`, categoria);
  // }
  // remover(id: number) {
  //   return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_CATEGORIAS}/${id}`);
  // }

  private _categorias = signal<ICategoria[]>([]);
  public listar(): Observable<ICategoria[]> {
    return of(
      this._categorias()
        .filter((c) => c.ativo)
        .sort((a, b) => a.id - b.id)
    );
  }
  public criar(categoria: Omit<ICategoria, 'id'>): Observable<number> {
    const newId = this._categorias().length + 1;
    this._categorias.update((value) => {
      const novaCategoria: ICategoria = { ...categoria, id: newId };
      return value.concat(novaCategoria);
    });
    return of(newId);
  }
  public editar(categoria: ICategoria): Observable<null> {
    const id = categoria.id;
    this._categorias.update((value) => {
      return value.filter((c) => c.id !== id).concat(categoria);
    });
    return of(null);
  }
  public excluir(categoria: ICategoria): Observable<null> {
    categoria.ativo = false;
    const id = categoria.id;
    this._categorias.update((value) => {
      return value.filter((c) => c.id !== id).concat(categoria);
    });
    return of(null);
  }
}
