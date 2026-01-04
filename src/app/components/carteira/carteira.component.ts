import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ICarteira } from '../../shared/interfaces';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-carteira',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatListModule],
  templateUrl: './carteira.component.html',
  styleUrl: './carteira.component.scss',
})
export class CarteiraComponent {
  carteira = input.required<ICarteira>();
  editar = output<void>();
  excluir = output<void>();
}
