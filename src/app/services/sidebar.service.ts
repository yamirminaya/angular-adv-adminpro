/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '',
        },
        {
          titulo: 'ProgressBar',
          url: 'progress',
        },
        {
          titulo: 'Gráficas',
          url: 'grafica',
        },
        {
          titulo: 'Promesas',
          url: 'promesas',
        },
        {
          titulo: 'RxJS',
          url: 'rxjs',
        },
      ],
    },
  ];

  constructor() {}
}
