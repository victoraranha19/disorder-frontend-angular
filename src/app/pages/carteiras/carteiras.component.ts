import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CarteiraComponent } from '../../components/carteira/carteira.component';
import { CarteirasService } from '../../services/carteiras.service';
import { ICarteira } from '../../shared/interfaces';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-carteiras',
  imports: [CommonModule, CarteiraComponent, FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './carteiras.component.html',
  styleUrl: './carteiras.component.scss',
})
export class CarteirasComponent implements OnInit {
  modalCarteira = viewChild.required<TemplateRef<HTMLDivElement>>('templateModalCarteira');

  #matDialog = inject(MatDialog);
  #carteirasService = inject(CarteirasService);

  #dialogRef?: MatDialogRef<HTMLDivElement>;

  carteiras: ICarteira[] = [];

  carteiraForm = new FormGroup({
    nomeCarteira: new FormControl<string>('', { nonNullable: true }),
    contaCorrente: new FormControl<number>(0, { nonNullable: true }),
    contaPoupanca: new FormControl<number | null>(null),
    contaInvestimento: new FormControl<number | null>(null),
    limiteDisponivel: new FormControl<number>(0, { nonNullable: true }),
    limiteTotalCredito: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    this._atualizarCarteiras$().subscribe();
  }

  abrirModal(): void {
    this.#dialogRef?.close(); // Fecha qualquer modal aberto antes de abrir um novo
    this.#dialogRef = this.#matDialog.open(this.modalCarteira());
  }

  salvarCarteira(): void {
    const carteira = {
      titulo: this.carteiraForm.controls.nomeCarteira.value,
      contaCorrente: this.carteiraForm.controls.contaCorrente.value,
      contaPoupanca: this.carteiraForm.controls.contaPoupanca.value ?? 0,
      contaInvestimento: this.carteiraForm.controls.contaInvestimento.value ?? 0,
      limiteCreditoTotal: this.carteiraForm.controls.limiteTotalCredito.value,
      idUsuario: 1,
      ativo: true,
    };
    this.#carteirasService
      .criar(carteira)
      .pipe(switchMap(() => this._atualizarCarteiras$()))
      .subscribe(() => console.log('Carteira salva com sucesso!'));

    this.carteiraForm.reset();
    this.#dialogRef?.close(); // Fecha o modal após salvar
  }

  private _atualizarCarteiras$(): Observable<ICarteira[]> {
    return this.#carteirasService.listar().pipe(
      tap((data) => {
        this.carteiras = data;
      })
    );
  }
}
