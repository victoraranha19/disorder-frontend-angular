import { Component, inject, OnInit, signal } from '@angular/core';
import { PerfilComponent } from '../../components/perfil/perfil.component';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../shared/interfaces';

@Component({
  selector: 'app-assessoria',
  imports: [PerfilComponent],
  templateUrl: './assessoria.component.html',
  styleUrl: './assessoria.component.scss',
})
export class AssessoriaComponent implements OnInit {
  #usuarioService = inject(UsuariosService);

  meuUsuario = signal<IUsuario | undefined>(undefined);

  ngOnInit() {
    this.#usuarioService.meuPerfil$().subscribe((usuario) => {
      this.meuUsuario.set(usuario);
    });
  }

  public editarPerfil(): void {
    // Lógica para editar o perfil do usuário
  }
}
