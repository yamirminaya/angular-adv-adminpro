/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (error) => console.warn('Error:', error),
    //     () => console.info('¡Obs. terminado!')
    //   );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      map((valor) => valor + 1),
      filter((valor) => valor % 2 === 0)
      // take(10)
    );
  }

  retornaObservable(): Observable<number> {
    return new Observable<number>((observer) => {
      let i: number = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I llegó a 2');
        }
      }, 1000);
    });
  }
}
