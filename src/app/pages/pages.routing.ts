/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'grafica',
        component: GraficaComponent,
        data: { titulo: 'Gráficas' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Account Settings' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'RxJS' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de usuario' },
      },

      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Mantenimiento de Hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Mantenimiento de Médicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Mantenimiento de Médicos' },
      },
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
