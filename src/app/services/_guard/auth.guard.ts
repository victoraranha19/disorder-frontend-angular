import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioLogado = inject(UsuariosService).usuarioLogado();
  const router = inject(Router);
  if (!usuarioLogado) void router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return usuarioLogado;
};
