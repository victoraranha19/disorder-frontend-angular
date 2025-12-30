import { Component, input, output } from '@angular/core';
import { ICategoria } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-categoria',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  categoria = input.required<ICategoria>();
  editar = output<void>();
  excluir = output<void>();
}
