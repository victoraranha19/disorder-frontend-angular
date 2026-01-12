import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Observable, switchMap, tap } from 'rxjs';

import { CarteiraComponent } from '../../components/carteira/carteira.component';
import { CarteirasService } from '../../services/carteiras.service';
import { ICarteira } from '../../shared/interfaces';

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
  carteiras = signal<ICarteira[]>([]);

  carteiraForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    titulo: new FormControl<string>('', { nonNullable: true }),
    limiteCreditoTotal: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    this._atualizarCarteiras$().subscribe();
  }

  public abrirModal(carteira?: ICarteira): void {
    this.carteiraForm.reset();
    this.#dialogRef?.close();

    if (carteira) {
      this.carteiraForm.controls.id.setValue(carteira.id);
      this.carteiraForm.controls.titulo.setValue(carteira.titulo);
      this.carteiraForm.controls.limiteCreditoTotal.setValue(carteira.limiteCreditoTotal);
    }
    this.#dialogRef = this.#matDialog.open(this.modalCarteira());
  }

  public salvarCarteira(): void {
    this.#dialogRef?.close();
    if (this.carteiraForm.controls.id.value > 0) {
      this._editarCarteira();
    } else {
      this._criarCarteira();
    }
  }

  public excluirCarteira(carteira: ICarteira): void {
    this.#carteirasService
      .remover$(carteira.id)
      .pipe(switchMap(() => this._atualizarCarteiras$()))
      .subscribe();
  }

  private _criarCarteira(): void {
    const carteira: Omit<ICarteira, 'id'> = {
      titulo: this.carteiraForm.controls.titulo.value,
      limiteCreditoTotal: this.carteiraForm.controls.limiteCreditoTotal.value,
      idUsuario: 1,
    };
    this.#carteirasService
      .criar$(carteira)
      .pipe(switchMap(() => this._atualizarCarteiras$()))
      .subscribe();
  }

  private _editarCarteira(): void {
    const carteira: ICarteira = {
      id: this.carteiraForm.controls.id.value,
      titulo: this.carteiraForm.controls.titulo.value,
      limiteCreditoTotal: this.carteiraForm.controls.limiteCreditoTotal.value,
      idUsuario: 1,
    };
    this.#carteirasService
      .editar$(carteira)
      .pipe(switchMap(() => this._atualizarCarteiras$()))
      .subscribe();
  }

  private _atualizarCarteiras$(): Observable<ICarteira[]> {
    return this.#carteirasService.listar$().pipe(tap((data) => this.carteiras.set(data)));
  }
}
