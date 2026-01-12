// export interface IUsuario {
//   id: number;
//   nome: string;
//   email: string;
//   usuario: string;
//   senha: string;
//   ativo: boolean;
// }
import { ETipoCarteira } from './enums';

export interface IUsuario {
  id: number;
  username: string;
  senha: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  chavePix: string;
  idAcessor?: number;
}
export interface IUsuarioRegistro {
  login: string;
  senha: string;
  nomeCompleto: string;
  email: string;
}
export interface IUsuarioLogin {
  login: string;
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

export interface ITransacoes {
  totalPaginas: number;
  totalTransacoes: number;
  transacoes: ITransacao[];
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
