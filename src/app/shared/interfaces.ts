// export interface IUsuario {
//   id: number;
//   nome: string;
//   email: string;
//   usuario: string;
//   senha: string;
//   ativo: boolean;
// }
export interface IUsuario {
  id: number;
  username: string;
  password: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  chavePix: string;
  idAcessor?: number;
  ativo: boolean;
}

export interface ICategoria {
  id: number;
  titulo: string;
  valorPlanejado: number;
  idUsuario: number;
  ativo: boolean;
}

export interface ICarteira {
  id: number;
  titulo: string;
  contaCorrente: number;
  contaPoupanca: number;
  contaInvestimento: number;
  limiteCreditoTotal: number;
  idUsuario: number;
  ativo: boolean;
}

export interface ITransacao {
  id: number;
  descricao: string;
  valor: number;
  dataTransacao: Date;
  tipo: ETipoTransacao; // 'C' | 'D'
  idCategoria?: number;
  idCarteira?: number;
  idUsuario: number;
  ativo: boolean;
}

export enum ETipoTransacao {
  CREDITO = 'C',
  DEBITO = 'D',
}
