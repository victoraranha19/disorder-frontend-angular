import { Component, computed, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent {
  /**
   * Tamanho do calendário: 'small', 'regular' ou 'large'
   * @default 'regular'
   */
  size = input<'small' | 'regular' | 'large'>('regular');
  /**
   * Texto do calendário
   * @default 'Janeiro'
   */
  text = input<string>('Janeiro');
  /**
   * Se o calendário deve ser exibido de forma ofuscada
   * @default false
   */
  ofuscado = input<boolean>(false);

  // Proporção fixa de 40:25 (largura:altura)
  private readonly _fullX = 320;
  private readonly _fullY = 200;
  private readonly _proportionX = 40;
  private readonly _proportionY = 25;

  private readonly reduce = computed(() => {
    switch (this.size()) {
      case 'small':
        return 2;
      case 'regular':
        return 1;
      case 'large':
        return 0;
    }
  });

  width = computed(() => {
    return this._fullX - this.reduce() * this._proportionX;
  });

  height = computed(() => {
    return this._fullY - this.reduce() * this._proportionY;
  });

  src = computed(() => {
    return this.ofuscado() ? '/calendario_ofuscado.svg' : '/calendario_padrao.svg';
  });
}
