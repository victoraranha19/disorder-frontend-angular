import { Component, computed, input, output, signal } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { MesAnoPipe } from '../../pipes/mes-ano.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendario-carrossel',
  imports: [MatButtonModule, MatIconModule, CalendarioComponent, MesAnoPipe],
  templateUrl: './calendario-carrossel.component.html',
  styleUrl: './calendario-carrossel.component.scss',
})
export class CalendarioCarrosselComponent {
  mesAtual = input<Date>(new Date());
  min = input<Date>(new Date(this.mesAtual().getFullYear() - 1, this.mesAtual().getMonth() + 1));
  max = input<Date>(new Date(this.mesAtual().getFullYear() + 1, this.mesAtual().getMonth() - 1));

  mesSelecionado = output<Date>();

  mesExibido = signal(this.mesAtual());
  mesAnterior = computed(() => {
    const min = this.min();
    const mesExibido = this.mesExibido();
    const novoMesAnterior = new Date(mesExibido.getFullYear(), mesExibido.getMonth() - 1);
    return novoMesAnterior.getTime() >= min.getTime() ? novoMesAnterior : null;
  });
  mesPosterior = computed(() => {
    const max = this.max();
    const mesExibido = this.mesExibido();
    const novoMesPosterior = new Date(mesExibido.getFullYear(), mesExibido.getMonth() + 1);
    return novoMesPosterior.getTime() <= max.getTime() ? novoMesPosterior : null;
  });

  public selectMesAnterior() {
    const mesAnterior = this.mesAnterior();
    if (mesAnterior) {
      this.mesExibido.set(new Date(mesAnterior));
      this.mesSelecionado.emit(new Date(mesAnterior));
    }
  }
  public selectMesPosterior() {
    const mesPosterior = this.mesPosterior();
    if (mesPosterior) {
      this.mesExibido.set(new Date(mesPosterior));
      this.mesSelecionado.emit(new Date(mesPosterior));
    }
  }
}
