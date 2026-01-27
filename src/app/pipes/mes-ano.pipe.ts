import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesAno',
})
export class MesAnoPipe implements PipeTransform {
  transform(value: Date): string {
    return `${this._mesPorExtenso(value)}/${value.getFullYear().toString().substring(2)}`;
  }

  private _mesPorExtenso(mes: Date): string {
    const valorMes = mes.getMonth() + 1; // Garante que o mês esteja entre 1 e 12
    return MES_POR_EXTENSO[valorMes as EMes];
  }
}

enum EMes {
  Janeiro = 1,
  Fevereiro,
  Marco,
  Abril,
  Maio,
  Junho,
  Julho,
  Agosto,
  Setembro,
  Outubro,
  Novembro,
  Dezembro,
}

const MES_POR_EXTENSO = {
  [EMes.Janeiro]: 'Janeiro',
  [EMes.Fevereiro]: 'Fevereiro',
  [EMes.Marco]: 'Março',
  [EMes.Abril]: 'Abril',
  [EMes.Maio]: 'Maio',
  [EMes.Junho]: 'Junho',
  [EMes.Julho]: 'Julho',
  [EMes.Agosto]: 'Agosto',
  [EMes.Setembro]: 'Setembro',
  [EMes.Outubro]: 'Outubro',
  [EMes.Novembro]: 'Novembro',
  [EMes.Dezembro]: 'Dezembro',
};
