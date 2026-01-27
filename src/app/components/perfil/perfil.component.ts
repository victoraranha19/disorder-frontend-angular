import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { IUsuario } from '../../shared/interfaces';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-perfil',
  imports: [MatCardModule, MatDividerModule, MatListModule, MatIcon, MatIconButton],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  tipoPerfil = input<TTipoPerfil>('outro-perfil');
  usuario = input<IUsuario>();

  editar = output();
}

type TTipoPerfil = 'meu-perfil' | 'outro-perfil';
