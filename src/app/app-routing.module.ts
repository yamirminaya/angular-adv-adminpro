/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//* Módulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  //! AYUDA VISUAL
  //* path: '/dashboard' PagesRouting
  //* path: '/auth' AuthRouting
  //* path: '/medicos' MedicosRouting
  //* path: '/compras' ComprasRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
