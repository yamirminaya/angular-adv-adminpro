import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { tap } from 'rxjs/operators';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.usuarioService.validarToken().subscribe((resp) => {
    //   console.log(resp);
    // });
    return this.usuarioService.validarToken().pipe(
      tap((estaAutenticado) => {
        console.log('estaAutenticado', estaAutenticado);
        if (!estaAutenticado) this.router.navigateByUrl('/login');
      })
    );
  }
}
