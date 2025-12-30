import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ICategoria, ITransacao } from '../shared/interfaces';
import { API_URL_BASE } from '../shared/constants';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransacoesService {
  // private readonly ROTA_TRANSACOES = '/transacoes';
  // #httpClient = inject(HttpClient);
  // listar() {
  //   return this.#httpClient.get<ITransacao[]>(`${API_URL_BASE}${this.ROTA_TRANSACOES}`);
  // }
  // transacaoPorId(id: string) {
  //   return this.#httpClient.get<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${id}`);
  // }
  // criar(transacao: Omit<ITransacao, 'id'>) {
  //   return this.#httpClient.post<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}`, transacao);
  // }
  // editar(transacao: ITransacao) {
  //   return this.#httpClient.put<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${transacao.id}`, transacao);
  // }
  // remover(id: number) {
  //   return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${id}`);
  // }

  private _transacoes = signal<ITransacao[]>([]);
  public listar(): Observable<ITransacao[]> {
    return of(
      this._transacoes()
        .filter((c) => c.ativo)
        .sort((a, b) => a.id - b.id)
    );
  }
  public criar(transacao: Omit<ITransacao, 'id'>): Observable<number> {
    const newId = this._transacoes().length + 1;
    this._transacoes.update((value) => {
      const novaTransacao: ITransacao = { ...transacao, id: newId };
      return value.concat(novaTransacao);
    });
    return of(newId);
  }
  public editar(transacao: ITransacao): Observable<null> {
    const id = transacao.id;
    this._transacoes.update((value) => {
      return value.filter((c) => c.id !== id).concat(transacao);
    });
    return of(null);
  }
  public excluir(transacao: ITransacao): Observable<null> {
    transacao.ativo = false;
    const id = transacao.id;
    this._transacoes.update((value) => {
      return value.filter((c) => c.id !== id).concat(transacao);
    });
    return of(null);
  }
}
