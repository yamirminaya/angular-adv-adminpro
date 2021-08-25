import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  cargarMedicos(desde: number = 0) {
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; medicos: Medico[]; total: number }) => {
        return {
          total: resp.total,
          medicos: resp.medicos,
        };
      })
    );
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; medico: Medico }) => {
        return resp.medico;
      })
    );
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
