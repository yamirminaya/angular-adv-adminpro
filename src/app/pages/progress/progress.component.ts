/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-constructor */
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progreso1: number = 25;

  progreso2: number = 35;

  classProgreso1: string = 'primary';

  classProgreso2: string = 'primary';

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  get getClassBGProgreso1() {
    return `bg-${this.classProgreso1}`;
  }

  get getClassBGProgreso2() {
    return `bg-${this.classProgreso2}`;
  }
}
