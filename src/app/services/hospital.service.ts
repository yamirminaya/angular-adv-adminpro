import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  cargarHospitales(desde: number = 0) {
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; hospitales: Hospital[]; total: number }) => {
        return {
          total: resp.total,
          hospitales: resp.hospitales,
        };
      })
    );
  }

  crearHospital(nombre: string) {
    return this.http.post(`${base_url}/hospitales`, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
