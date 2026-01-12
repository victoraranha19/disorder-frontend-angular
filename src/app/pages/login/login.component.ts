import { Component, inject } from '@angular/core';
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
  providers: [UsuariosService],
})
export class LoginComponent {
  #usuariosService = inject(UsuariosService);

  formUsuario = new FormGroup({
    login: new FormControl<string>(''),
    senha: new FormControl<string>(''),
    nomeCompleto: new FormControl<string>(''),
    email: new FormControl<string>(''),
  });

  logar() {
    const usuario: IUsuarioLogin = {
      login: this.formUsuario.controls.login.value ?? '',
      senha: this.formUsuario.controls.senha.value ?? '',
    };
    this.#usuariosService.logar$(usuario).subscribe();
  }

  criarConta() {
    const usuario: IUsuarioRegistro = {
      login: this.formUsuario.controls.login.value ?? '',
      senha: this.formUsuario.controls.senha.value ?? '',
      email: this.formUsuario.controls.email.value ?? '',
      nomeCompleto: this.formUsuario.controls.nomeCompleto.value ?? '',
    };
    this.#usuariosService.registrar$(usuario).subscribe();
  }
}
