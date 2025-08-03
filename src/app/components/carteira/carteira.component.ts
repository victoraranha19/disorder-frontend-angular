import { CommonModule } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ICarteira } from '../../shared/interfaces';

@Component({
  selector: 'app-carteira',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule],
  templateUrl: './carteira.component.html',
  styleUrl: './carteira.component.scss',
})
export class CarteiraComponent implements OnInit {
  carteira = input.required<ICarteira>();
  nomeCarteira = signal<string>('');

  contaCorrente = signal<number>(0);
  contaPoupanca = signal<number>(0);
  contaInvestimento = signal<number>(0);

  limiteTotalCredito = signal<number>(0);
  limiteDisponivel = signal<number>(0);

  // #carteirasService = inject(CarteirasService);

  ngOnInit() {
    this.nomeCarteira.set(this.carteira().titulo);
    this.contaCorrente.set(this.carteira().contaCorrente);
    this.contaPoupanca.set(this.carteira().contaPoupanca ?? 0);
    this.contaInvestimento.set(this.carteira().contaInvestimento ?? 0);
    this.limiteTotalCredito.set(this.carteira().limiteCreditoTotal);
    // this.limiteDisponivel.set(this.limiteTotalCredito() - (this.contaPoupanca() + this.contaInvestimento()));
  }

  editarCarteira() {
    console.log('Editar carteira:', this.carteira());
    // Aqui você pode implementar a lógica para editar a carteira
  }

  removerCarteira() {
    console.log('Remover carteira:', this.carteira());
    // Aqui você pode implementar a lógica para remover a carteira
  }
}
