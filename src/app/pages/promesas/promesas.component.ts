/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => console.log(usuarios));
    // const promesa = new Promise((resolve, reject) => {
    //   const r = false;
    //   if (r) {
    //     resolve('hola mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });
    // promesa
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(`Error: ${error}`);
    //   });
    // console.log('Fin del init');
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data))
        .catch((error) => reject(error));
    });
  }
}
