import { Routes } from '@angular/router';
import { authGuard } from './services/_guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
    children: [
      { path: '', redirectTo: 'transacoes', pathMatch: 'full' },
      {
        path: 'resumo',
        loadComponent: () => import('./pages/resumo/resumo.component').then((c) => c.ResumoComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Minhas Carteiras',
        path: 'carteiras',
        loadComponent: () => import('./pages/carteiras/carteiras.component').then((c) => c.CarteirasComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Categorias',
        path: 'categorias',
        loadComponent: () => import('./pages/categorias/categorias.component').then((c) => c.CategoriasComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Minhas Transações',
        path: 'transacoes',
        loadComponent: () => import('./pages/transacoes/transacoes.component').then((c) => c.TransacoesComponent),
        canActivate: [authGuard],
      },
      {
        title: 'Assessoria',
        path: 'assessoria',
        loadComponent: () => import('./pages/assessoria/assessoria.component').then((c) => c.AssessoriaComponent),
        canActivate: [authGuard],
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
