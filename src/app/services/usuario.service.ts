import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
// TAP: Dispara efecto secundario.
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { SocialAuthService } from 'angularx-social-login';

// Interfaces
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

// Modelos
import { Usuario } from '../models/usuario.model';

const { base_url } = environment;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  // Obtener token (resumido)
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, uid, img = '' } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid); // Información de usuario
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((error) => of(false)) // Si existe un error, creamos un nuevo OBSERVABLE (OF) que retorna un FALSE
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string): any {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.socialAuthService.signOut();
    this.router.navigateByUrl('/login');
  }

  //delay(2000)
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
