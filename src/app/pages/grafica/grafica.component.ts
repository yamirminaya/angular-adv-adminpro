/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [],
})
export class GraficaComponent {
  public labels1: string[] = ['Pan', 'In-Store Sales', 'Mail-Order Sales'];

  public data1: any = [[900, 450, 100]];
}
