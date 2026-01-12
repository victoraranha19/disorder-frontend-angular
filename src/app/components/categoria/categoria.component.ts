import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { ICategoria } from '../../shared/interfaces';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatListModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  categoria = input.required<ICategoria>();
  editar = output<void>();
  excluir = output<void>();
}
