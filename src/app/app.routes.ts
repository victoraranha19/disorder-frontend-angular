import { Routes } from '@angular/router';

import { CarteirasComponent } from './pages/carteiras/carteiras.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'carteiras', component: CarteirasComponent },
  { path: 'gastos', component: GastosComponent },
  { path: '', redirectTo: 'carteiras', pathMatch: 'full' },
  { path: '**', redirectTo: 'carteiras', pathMatch: 'full' },
];
