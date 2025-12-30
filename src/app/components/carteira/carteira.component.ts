import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
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
export class CarteiraComponent {
  carteira = input.required<ICarteira>();
  editar = output<void>();
  excluir = output<void>();
}
