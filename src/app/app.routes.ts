import { Routes } from '@angular/router';

import { CarteirasComponent } from './pages/carteiras/carteiras.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/_guard/auth.guard';
import { CategoriasComponent } from './pages/categorias/categorias.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'carteiras', component: CarteirasComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'transacoes', component: TransacoesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
