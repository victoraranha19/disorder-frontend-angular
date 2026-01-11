import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioLogado = inject(UsuariosService).verificaUsuarioLogado();
  const router = inject(Router)
  console.log('authGuard called', usuarioLogado);
  if (!usuarioLogado) void router.navigate(['/', 'login'], { queryParams: { returnUrl: state.url } });
  return usuarioLogado;
};
