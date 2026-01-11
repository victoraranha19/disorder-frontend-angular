import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { switchMap, tap } from 'rxjs';

import { ICarteira, ICategoria, ITransacao } from '../../shared/interfaces';
import { TransacoesService } from '../../services/transacoes.service';
import { CarteirasService } from '../../services/carteiras.service';
import { CategoriasService } from '../../services/categorias.service';
import { ETipoCarteira } from '../../shared/enums';

@Component({
  selector: 'app-transacoes',
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss',
})
export class TransacoesComponent implements OnInit {
  modalGasto = viewChild.required<TemplateRef<HTMLDivElement>>('templateModalGasto');

  public readonly ETipoTransacao = ETipoCarteira;

  #matDialog = inject(MatDialog);
  #gastosService = inject(TransacoesService);
  #carteirasService = inject(CarteirasService);
  #categoriasService = inject(CategoriasService);

  private readonly _hoje = new Date();
  mesSelecionado: Date = new Date(this._hoje);
  #dialogRef?: MatDialogRef<HTMLDivElement>;
  receitas = signal<ITransacao[]>([]);
  despesas = signal<ITransacao[]>([]);
  carteirasOptions = signal<ICarteira[]>([]);
  categoriasOptions = signal<ICategoria[]>([]);

  gastoForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    descricao: new FormControl<string>('', { nonNullable: true }),
    valor: new FormControl<number>(0, { nonNullable: true }),
    tipo: new FormControl<ETipoCarteira>(ETipoCarteira.LIMITE_CREDITO, { nonNullable: true }),
    dataTransacao: new FormControl<Date>(this._hoje, { nonNullable: true }),
    parcelas: new FormControl<number>(1, { nonNullable: true }),
    idCarteira: new FormControl<number | null>(null),
    idCategoria: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this._listarTransacoes$().subscribe();

    this.#carteirasService.listar$().subscribe((data) => {
      this.carteirasOptions.set(data);
    });
    this.#categoriasService.listar$().subscribe((data) => {
      this.categoriasOptions.set(data);
    });
  }

  public abrirModal(gasto?: ITransacao, tipo: ETipoCarteira = ETipoCarteira.LIMITE_CREDITO): void {
    this.gastoForm.reset();
    this.#dialogRef?.close();

    this.gastoForm.controls.tipo.setValue(tipo);

    if (gasto) {
      this.gastoForm.controls.id.setValue(gasto.id);
      this.gastoForm.controls.tipo.setValue(gasto.tipo);
      this.gastoForm.controls.valor.setValue(gasto.valor);
      this.gastoForm.controls.descricao.setValue(gasto.descricao);
      this.gastoForm.controls.dataTransacao.setValue(gasto.dataTransacao);
      this.gastoForm.controls.parcelas.setValue(gasto.parcelas);
      this.gastoForm.controls.idCarteira.setValue(gasto.idCarteira ?? null);
      this.gastoForm.controls.idCategoria.setValue(gasto.idCategoria ?? null);
    }
    this.#dialogRef = this.#matDialog.open(this.modalGasto());
  }

  public salvarGasto(): void {
    this.#dialogRef?.close();

    const categoria = this.categoriasOptions().find((c) => c.id === this.gastoForm.controls.idCategoria.value);
    const carteira = this.carteirasOptions().find((c) => c.id === this.gastoForm.controls.idCarteira.value);

    if (this.gastoForm.controls.id.value > 0) {
      this._editarCategoria(carteira, categoria);
    } else {
      this._adicionarGasto(carteira, categoria);
    }
  }

  public excluirGasto(gasto: ITransacao): void {
    this.#gastosService
      .remover$(gasto.id)
      .pipe(switchMap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _adicionarGasto(carteira?: ICarteira, categoria?: ICategoria): void {
    const gasto: Omit<ITransacao, 'id'> = {
      descricao: this.gastoForm.controls.descricao.value,
      valor: this.gastoForm.controls.valor.value,
      tipo: this.gastoForm.controls.tipo.value,
      dataTransacao: this.gastoForm.controls.dataTransacao.value,
      parcelas: this.gastoForm.controls.parcelas.value,
      idCategoria: categoria?.id,
      tituloCategoria: categoria?.titulo,
      idCarteira: carteira?.id,
      tituloCarteira: carteira?.titulo,
      idUsuario: 1,
    };

    this.#gastosService
      .criar$(gasto)
      .pipe(switchMap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _editarCategoria(carteira?: ICarteira, categoria?: ICategoria): void {
    const gasto: ITransacao = {
      id: this.gastoForm.controls.id.value,
      descricao: this.gastoForm.controls.descricao.value,
      valor: this.gastoForm.controls.valor.value,
      tipo: this.gastoForm.controls.tipo.value,
      dataTransacao: this.gastoForm.controls.dataTransacao.value,
      parcelas: this.gastoForm.controls.parcelas.value,
      idCategoria: categoria?.id,
      tituloCategoria: categoria?.titulo,
      idCarteira: carteira?.id,
      tituloCarteira: carteira?.titulo,
      idUsuario: 1,
    };
    if (this.gastoForm.controls.idCategoria.value) {
      const categoria = this.categoriasOptions().find((c) => c.id === this.gastoForm.controls.idCategoria.value);
      gasto.idCategoria = categoria?.id;
      gasto.tituloCategoria = categoria?.titulo;
    }
    if (this.gastoForm.controls.idCarteira.value) {
      const carteira = this.carteirasOptions().find((c) => c.id === this.gastoForm.controls.idCarteira.value);
      gasto.idCarteira = carteira?.id;
      gasto.tituloCarteira = carteira?.titulo;
    }

    this.#gastosService
      .editar$(gasto)
      .pipe(tap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _listarTransacoes$() {
    return this.#gastosService.listar$({ pagina: 0, itensPorPagina: 20, mesAno: '012026' }, 'entradas').pipe(
      tap((data) => this.receitas.set(data.transacoes)),
      switchMap(() => this.#gastosService.listar$({ pagina: 0, itensPorPagina: 20, mesAno: '012026' }, 'saidas')),
      tap((data) => this.despesas.set(data.transacoes))
    );
  }
}
