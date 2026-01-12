import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoriaComponent } from '../../components/categoria/categoria.component';
import { Observable, switchMap, tap } from 'rxjs';
import { ICategoria } from '../../shared/interfaces';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  imports: [CategoriaComponent, FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit {
  modalCategoria = viewChild.required<TemplateRef<HTMLDivElement>>('templateModalCategoria');

  #matDialog = inject(MatDialog);
  #categoriasService = inject(CategoriasService);

  #dialogRef?: MatDialogRef<HTMLDivElement>;
  categorias = signal<ICategoria[]>([]);

  categoriaForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    titulo: new FormControl<string>('', { nonNullable: true }),
    valorPlanejado: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    this._atualizarCategorias$().subscribe();
  }

  public abrirModal(categoria?: ICategoria): void {
    this.categoriaForm.reset();
    this.#dialogRef?.close();

    if (categoria) {
      this.categoriaForm.controls.id.setValue(categoria.id);
      this.categoriaForm.controls.titulo.setValue(categoria.titulo);
      this.categoriaForm.controls.valorPlanejado.setValue(categoria.valorPlanejado);
    }
    this.#dialogRef = this.#matDialog.open(this.modalCategoria());
  }

  public salvarCarteira(): void {
    this.#dialogRef?.close();
    if (this.categoriaForm.controls.id.value > 0) {
      this._editarCategoria();
    } else {
      this._criarCategoria();
    }
  }

  public excluirCategoria(categoria: ICategoria): void {
    this.#categoriasService
      .remover$(categoria.id)
      .pipe(switchMap(() => this._atualizarCategorias$()))
      .subscribe();
  }

  private _criarCategoria(): void {
    const categoria: Omit<ICategoria, 'id'> = {
      titulo: this.categoriaForm.controls.titulo.value,
      valorPlanejado: this.categoriaForm.controls.valorPlanejado.value,
      idUsuario: 1,
    };
    this.#categoriasService
      .criar$(categoria)
      .pipe(switchMap(() => this._atualizarCategorias$()))
      .subscribe();
  }

  private _editarCategoria(): void {
    const categoria: ICategoria = {
      id: this.categoriaForm.controls.id.value,
      titulo: this.categoriaForm.controls.titulo.value,
      valorPlanejado: this.categoriaForm.controls.valorPlanejado.value,
      idUsuario: 1,
    };
    this.#categoriasService
      .editar$(categoria)
      .pipe(switchMap(() => this._atualizarCategorias$()))
      .subscribe();
  }

  private _atualizarCategorias$(): Observable<ICategoria[]> {
    return this.#categoriasService.listar$().pipe(tap((data) => this.categorias.set(data)));
  }
}
