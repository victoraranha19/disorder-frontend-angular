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
  usuario: string;
  nome_completo: string;
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
  data: Date;
  tipo: ETipoTransacao; // 'C' | 'D'
  idCategoria: number;
  idCarteira: number;
  idUsuario: number;
  ativo: boolean;
}

export enum ETipoTransacao {
  CREDITO = 'C',
  DEBITO = 'D',
}
