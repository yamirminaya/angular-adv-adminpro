/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  //* Renombrar
  // @Input('valor') progreso: number = 40;
  @Input('valor') progreso: number = 40;
  @Input() generalClass: string = 'primary';

  // @Input() btnClass: string = 'btn-primary';
  // @Input() bgProgressClass: string = 'bg-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter(true);
  @Output() generalClassSalida: EventEmitter<string> = new EventEmitter(true);

  btnClass: string;

  ngOnInit() {
    this.btnClass = `btn btn-${this.generalClass}`;
    // setTimeout(() => {
    // this.generalClassSalida.emit(this.generalClass);
    // }, 1000);
    Promise.resolve(null).then(() =>
      this.generalClassSalida.emit(this.generalClass)
    );
    // this.
    // this.bgProgressClassSalida.emit(this.bgProgressClass);
  }

  cambiarValor(valor: number) {
    // this.generalClassSalida.emit(this.generalClass);
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }

    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor:number) {
    if (nuevoValor >= 100) this.progreso = 100;
    else if (nuevoValor <= 0) this.progreso = 0;
    else this.progreso = nuevoValor;

    this.valorSalida.emit(this.progreso);
  }
}
