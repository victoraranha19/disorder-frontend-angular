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

import { ICarteira, ICategoria, IRequestTransacaoListagem, ITransacao } from '../../shared/interfaces';
import { TransacoesService } from '../../services/transacoes.service';
import { CarteirasService } from '../../services/carteiras.service';
import { CategoriasService } from '../../services/categorias.service';
import { ETipoCarteira } from '../../shared/enums';
import { MatDividerModule } from '@angular/material/divider';
import { CalendarioCarrosselComponent } from '../../components/calendario-carrossel/calendario-carrossel.component';

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
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    // App
    CalendarioCarrosselComponent,
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss',
})
export class TransacoesComponent implements OnInit {
  modalTransacao = viewChild.required<TemplateRef<HTMLDivElement>>('templateModalGasto');

  #matDialog = inject(MatDialog);
  #transacoesService = inject(TransacoesService);
  #carteirasService = inject(CarteirasService);
  #categoriasService = inject(CategoriasService);

  private readonly _hoje = new Date();
  mesSelecionado: Date = new Date(this._hoje);
  #dialogRef?: MatDialogRef<HTMLDivElement>;

  receitas = signal<ITransacao[]>([]);
  despesas = signal<ITransacao[]>([]);
  carteirasOptions = signal<ICarteira[]>([]);
  categoriasOptions = signal<ICategoria[]>([]);

  transacaoForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    descricao: new FormControl<string>('', { nonNullable: true }),
    valor: new FormControl<number>(0, { nonNullable: true }),
    tipoCarteira: new FormControl<ETipoCarteira>(ETipoCarteira.LIMITE_CREDITO, { nonNullable: true }),
    dataTransacao: new FormControl<Date>(this._hoje, { nonNullable: true }),
    parcelas: new FormControl<number>(1, { nonNullable: true }),
    idCarteira: new FormControl<number | null>(null),
    idCategoria: new FormControl<number | null>(null),
  });
  tipoTransacao = new FormControl<'entrada' | 'saida'>('entrada', { nonNullable: true });

  ngOnInit(): void {
    this._listarTransacoes$().subscribe();

    this.#carteirasService.listar$().subscribe((data) => {
      this.carteirasOptions.set(data);
    });
    this.#categoriasService.listar$().subscribe((data) => {
      this.categoriasOptions.set(data);
    });
  }

  public mudarMesSelecionado(novoMes: Date): void {
    this.mesSelecionado = novoMes;
    this._listarTransacoes$(novoMes).subscribe();
  }

  public abrirModal(tipoTransacao: 'entrada' | 'saida', transacao?: ITransacao, tipoCarteira: ETipoCarteira = ETipoCarteira.LIMITE_CREDITO): void {
    this.transacaoForm.reset();
    this.#dialogRef?.close();

    this.tipoTransacao.setValue(tipoTransacao);
    this.transacaoForm.controls.tipoCarteira.setValue(tipoCarteira);

    if (transacao) {
      this.transacaoForm.controls.id.setValue(transacao.id);
      this.transacaoForm.controls.tipoCarteira.setValue(transacao.tipo);
      this.transacaoForm.controls.valor.setValue(transacao.valor);
      this.transacaoForm.controls.descricao.setValue(transacao.descricao);
      this.transacaoForm.controls.dataTransacao.setValue(transacao.dataTransacao);
      this.transacaoForm.controls.parcelas.setValue(transacao.parcelas);
      this.transacaoForm.controls.idCarteira.setValue(transacao.idCarteira ?? null);
      this.transacaoForm.controls.idCategoria.setValue(transacao.idCategoria ?? null);
    }
    this.#dialogRef = this.#matDialog.open(this.modalTransacao());
  }

  public salvarTransacao(): void {
    this.#dialogRef?.close();

    const categoria = this.categoriasOptions().find((c) => c.id === this.transacaoForm.controls.idCategoria.value);
    const carteira = this.carteirasOptions().find((c) => c.id === this.transacaoForm.controls.idCarteira.value);
    if (this.tipoTransacao.value === 'saida') this.transacaoForm.controls.valor.setValue(this.transacaoForm.controls.valor.value * -1);

    if (this.transacaoForm.controls.id.value > 0) {
      this._editarTransacao(carteira, categoria);
    } else {
      this._adicionarTransacao(carteira, categoria);
    }
  }

  public excluirTransacao(transacao: ITransacao): void {
    this.#transacoesService
      .remover$(transacao.id)
      .pipe(switchMap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _adicionarTransacao(carteira?: ICarteira, categoria?: ICategoria): void {
    const transacao: Omit<ITransacao, 'id'> = {
      descricao: this.transacaoForm.controls.descricao.value,
      valor: this.transacaoForm.controls.valor.value,
      tipo: this.transacaoForm.controls.tipoCarteira.value,
      dataTransacao: this.transacaoForm.controls.dataTransacao.value,
      parcelas: this.transacaoForm.controls.parcelas.value,
      idCategoria: categoria?.id,
      tituloCategoria: categoria?.titulo,
      idCarteira: carteira?.id,
      tituloCarteira: carteira?.titulo,
      idUsuario: 1,
    };

    this.#transacoesService
      .criar$(transacao)
      .pipe(switchMap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _editarTransacao(carteira?: ICarteira, categoria?: ICategoria): void {
    const transacao: ITransacao = {
      id: this.transacaoForm.controls.id.value,
      descricao: this.transacaoForm.controls.descricao.value,
      valor: this.transacaoForm.controls.valor.value,
      tipo: this.transacaoForm.controls.tipoCarteira.value,
      dataTransacao: this.transacaoForm.controls.dataTransacao.value,
      parcelas: this.transacaoForm.controls.parcelas.value,
      idCategoria: categoria?.id,
      tituloCategoria: categoria?.titulo,
      idCarteira: carteira?.id,
      tituloCarteira: carteira?.titulo,
      idUsuario: 1,
    };
    if (this.transacaoForm.controls.idCategoria.value) {
      const categoria = this.categoriasOptions().find((c) => c.id === this.transacaoForm.controls.idCategoria.value);
      transacao.idCategoria = categoria?.id;
      transacao.tituloCategoria = categoria?.titulo;
    }
    if (this.transacaoForm.controls.idCarteira.value) {
      const carteira = this.carteirasOptions().find((c) => c.id === this.transacaoForm.controls.idCarteira.value);
      transacao.idCarteira = carteira?.id;
      transacao.tituloCarteira = carteira?.titulo;
    }

    this.#transacoesService
      .editar$(transacao)
      .pipe(switchMap(() => this._listarTransacoes$()))
      .subscribe();
  }

  private _listarTransacoes$(data: Date = this.mesSelecionado) {
    const params: IRequestTransacaoListagem = {
      mesAno: this._getMesAno(data),
    };
    return this.#transacoesService.listar$(params, 'entradas').pipe(
      tap((transacoes) => this.receitas.set(transacoes)),
      switchMap(() => this.#transacoesService.listar$(params, 'saidas')),
      tap((transacoes) => this.despesas.set(transacoes))
    );
  }

  private _getMesAno(date: Date): string {
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear().toString();
    return `${mes}${ano}`;
  }
}
