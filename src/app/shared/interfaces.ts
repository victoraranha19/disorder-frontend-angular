import { ETipoCarteira } from './enums';

export interface IUsuario {
  email: string;
  nomeCompleto: string;
  telefone: string;
  chavePix: string;
}
export interface IUsuarioRegistro {
  senha: string;
  nomeCompleto: string;
  email: string;
}
export interface IUsuarioLogin {
  email: string;
  senha: string;
}
export interface IUsuarioLogado {
  token: string;
}

export interface ICategoria {
  id: number;
  titulo: string;
  valorPlanejado: number;
  idUsuario: number;
}

export interface ICarteira {
  id: number;
  titulo: string;
  limiteCreditoTotal: number;
  idUsuario: number;
}

export interface ITransacao {
  id: number;
  descricao: string;
  valor: number;
  dataTransacao: Date;
  tipo: ETipoCarteira;
  parcelas: number;
  idCategoria?: number;
  tituloCategoria?: string;
  idCarteira?: number;
  tituloCarteira?: string;
  idUsuario: number;
}

export interface IRequestTransacaoListagem {
  mesAno: string;
  idCarteira?: number;
  idCategoria?: number;
}
