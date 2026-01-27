import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (!req.url.includes('/api/') || req.method === 'OPTIONS' || !token) {
    return next(req);
  }
  const snackBar = inject(MatSnackBar);
  // const usuarioService = inject(UsuariosService);
  req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        snackBar.open('Sua sessão expirou. Por favor, faça login novamente.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
      throw error;
    })
  );
};
