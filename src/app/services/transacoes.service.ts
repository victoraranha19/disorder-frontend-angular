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
}
