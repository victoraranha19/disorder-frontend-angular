import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTabsModule],
  providers: [UsuariosService],
})
export class LoginComponent implements OnInit {
  #usuarioService = inject(UsuariosService);

  usuarios: IUsuario[] = [];
  usuario: string = '';

  ngOnInit() {
    this.#usuarioService.listar().subscribe((data) => {
      this.usuarios = data;
    });
  }

  logar() {
    this.#usuarioService.logar();
  }
  criarConta() {
    this.#usuarioService.logar();
  }
}
