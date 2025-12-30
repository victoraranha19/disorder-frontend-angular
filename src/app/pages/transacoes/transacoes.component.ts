import { Component, inject, LOCALE_ID, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ETipoTransacao, ITransacao } from '../../shared/interfaces';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable, switchMap, tap } from 'rxjs';
import { TransacoesService } from '../../services/transacoes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-transacoes',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  providers: [ { provide: LOCALE_ID, useValue: 'pt-PT' } ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss',
})
export class TransacoesComponent implements OnInit {
  modalGasto = viewChild.required<TemplateRef<HTMLDivElement>>('templateModalGasto');

  #matDialog = inject(MatDialog);
  #gastosService = inject(TransacoesService);

  private readonly _hoje = new Date();
  mesSelecionado = new Date(this._hoje.getFullYear(), this._hoje.getMonth());
  #dialogRef?: MatDialogRef<HTMLDivElement>;
  gastos = signal<ITransacao[]>([]);

  gastoForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    descricao: new FormControl<string>('', { nonNullable: true }),
    valor: new FormControl<number>(0, { nonNullable: true }),
    tipo: new FormControl<ETipoTransacao>(ETipoTransacao.DEBITO, { nonNullable: true }),
    dataTransacao: new FormControl<Date>(this._hoje, { nonNullable: true }),
    idCarteira: new FormControl<number | null>(null),
    idCategoria: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this._atualizarGastos$().subscribe();
  }

  public abrirModal(gasto?: ITransacao): void {
    this.gastoForm.reset();
    this.#dialogRef?.close();

    if (gasto) {
      this.gastoForm.controls.id.setValue(gasto.id);
      this.gastoForm.controls.descricao.setValue(gasto.descricao);
      this.gastoForm.controls.valor.setValue(gasto.valor);
      this.gastoForm.controls.tipo.setValue(gasto.tipo);
      this.gastoForm.controls.dataTransacao.setValue(gasto.dataTransacao);
      this.gastoForm.controls.idCarteira.setValue(gasto.idCarteira ?? null);
      this.gastoForm.controls.idCategoria.setValue(gasto.idCategoria ?? null);
    }
    this.#dialogRef = this.#matDialog.open(this.modalGasto());
  }

  public salvarGasto(): void {
    this.#dialogRef?.close();
    if (this.gastoForm.controls.id.value > 0) {
      this._editarCategoria();
    } else {
      this._adicionarGasto();
    }
  }

  public excluirGasto(gasto: ITransacao): void {
    this.#gastosService
      .excluir(gasto)
      .pipe(switchMap(() => this._atualizarGastos$()))
      .subscribe();
  }

  private _adicionarGasto(): void {
    const gasto: Omit<ITransacao, 'id'> = {
      descricao: this.gastoForm.controls.descricao.value,
      valor: this.gastoForm.controls.valor.value,
      tipo: this.gastoForm.controls.tipo.value,
      dataTransacao: this.gastoForm.controls.dataTransacao.value,
      idUsuario: 1,
      ativo: true,
    };
    if (this.gastoForm.controls.idCategoria.value) {
      gasto.idCategoria = this.gastoForm.controls.idCategoria.value;
    }
    if (this.gastoForm.controls.idCarteira.value) {
      gasto.idCarteira = this.gastoForm.controls.idCarteira.value;
    }

    this.#gastosService
      .criar(gasto)
      .pipe(switchMap(() => this._atualizarGastos$()))
      .subscribe();
  }

  private _editarCategoria(): void {
    const gasto: ITransacao = {
      id: this.gastoForm.controls.id.value,
      descricao: this.gastoForm.controls.descricao.value,
      valor: this.gastoForm.controls.valor.value,
      tipo: this.gastoForm.controls.tipo.value,
      dataTransacao: this.gastoForm.controls.dataTransacao.value,
      idUsuario: 1,
      ativo: true,
    };
    if (this.gastoForm.controls.idCategoria.value) {
      gasto.idCategoria = this.gastoForm.controls.idCategoria.value;
    }
    if (this.gastoForm.controls.idCarteira.value) {
      gasto.idCarteira = this.gastoForm.controls.idCarteira.value;
    }
    this.#gastosService
      .editar(gasto)
      .pipe(switchMap(() => this._atualizarGastos$()))
      .subscribe();
  }

  private _atualizarGastos$(): Observable<ITransacao[]> {
    return this.#gastosService.listar().pipe(tap((data) => this.gastos.set(data)));
  }
}
