import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { UsuariosService } from '../../services/usuarios.service';
import { IUsuarioLogin, IUsuarioRegistro } from '../../shared/interfaces';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTabsModule, MatCardModule],
})
export class LoginComponent {
  abrirMenu = output();

  viewRecuperarSenha = signal(false);

  #usuariosService = inject(UsuariosService);

  formUsuario = new FormGroup({
    senha: new FormControl<string>(''),
    nomeCompleto: new FormControl<string>(''),
    email: new FormControl<string>(''),
  });

  logar() {
    const usuario: IUsuarioLogin = {
      email: this.formUsuario.controls.email.value ?? '',
      senha: this.formUsuario.controls.senha.value ?? '',
    };
    this.#usuariosService.logar$(usuario).subscribe(() => this.abrirMenu.emit());
  }

  criarConta() {
    const usuario: IUsuarioRegistro = {
      senha: this.formUsuario.controls.senha.value ?? '',
      email: this.formUsuario.controls.email.value ?? '',
      nomeCompleto: this.formUsuario.controls.nomeCompleto.value ?? '',
    };
    this.#usuariosService.registrar$(usuario).subscribe();
  }

  enviarEmailRecuperacao() {
    this.#usuariosService.recuperarConta$(this.formUsuario.controls.email.value).subscribe(() => this.viewRecuperarSenha.set(false));
  }
}
