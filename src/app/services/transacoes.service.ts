import { inject, Injectable } from '@angular/core';
import { IRequestTransacaoListagem, ITransacao } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class TransacoesService {
  private readonly ROTA_TRANSACOES = '/transacoes';

  #httpClient = inject(HttpClient);

  listar$(params: IRequestTransacaoListagem, tipoTransacao: 'entradas' | 'saidas') {
    let parametros = `?mesAno=${params.mesAno}`;
    if (params.idCarteira) parametros = parametros.concat('&idCarteira=' + params.idCarteira);
    if (params.idCategoria) parametros = parametros.concat('&idCategoria=' + params.idCategoria);
    return this.#httpClient.get<ITransacao[]>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${tipoTransacao}${parametros}`);
  }
  criar$(transacao: Omit<ITransacao, 'id'>) {
    return this.#httpClient.post<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}`, transacao);
  }
  editar$(transacao: ITransacao) {
    return this.#httpClient.put<ITransacao>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${transacao.id}`, transacao);
  }
  remover$(id: number) {
    return this.#httpClient.delete<null>(`${API_URL_BASE}${this.ROTA_TRANSACOES}/${id}`);
  }
}
