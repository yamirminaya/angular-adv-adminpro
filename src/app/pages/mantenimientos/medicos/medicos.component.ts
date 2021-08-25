import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public totalMedicos: number = 0;

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];

  public cargando: boolean = true;
  public desde: number = 0;

  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService
      .cargarMedicos(this.desde)
      .subscribe(({ total, medicos }) => {
        this.totalMedicos = total;
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Médico borrado',
            `${medico.nombre} fue eliminado`,
            'success'
          );
        });
      }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.medicos = this.medicosTemp);
    }
    this.busquedasService
      .buscar('medicos', termino)
      .subscribe((resp: Medico[]) => {
        this.medicos = resp;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalMedicos) {
      this.desde -= valor;
    }

    this.cargarMedicos();
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    // if (value.trim().length > 0) {
    //   this.medicoService.crearMedico(value).subscribe((resp: any) => {
    //     this.medicos.push(resp.hospital);
    //   });
    // }
  }
}
