import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITransacao } from '../shared/interfaces';
import { API_URL_BASE } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class TransacoesService {
  private readonly ROTA_TRANSACOES = '/transacoes';

  httpClient = inject(HttpClient);

  listar() {
    return this.httpClient.get<ITransacao[]>(`${API_URL_BASE}${this.ROTA_TRANSACOES}`);
  }

  transacaoPorId(id: string) {
    return this.httpClient.get<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${id}`);
  }

  criar(transacao: Omit<ITransacao, 'id'>) {
    return this.httpClient.post<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}`, transacao);
  }

  editar(transacao: ITransacao) {
    return this.httpClient.put<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${transacao.id}`, transacao);
  }

  remover(id: number) {
    return this.httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${id}`);
  }
}
