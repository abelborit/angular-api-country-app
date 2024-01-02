import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-shared-components-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  /* un Subject es un tipo especial de Observable, es como crear un observable manualmente y podamos suscribirnos, usar los pipe, etc. */
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholderProp: string = 'Search here...';

  /* 2. emitir el valor del input al padre */
  // @Output()
  // public handleSearchValueEmitter: EventEmitter<string> = new EventEmitter();

  @Output()
  public handleDebouceSearchValueEmitter: EventEmitter<string> =
    new EventEmitter();

  /* Normalmente se usa el constructor para inicializar variables y para indicarle a Angular que dependencias queremos que cargue, y el ngOnInit para inicializar o ejecutar tareas que tienen que ver con Angular. Todo esto lo podemos poner directamente en el constructor y funcionaría de la misma manera, pero no está de más tener más separado el código para que sea más mantenible. Es decir, es recomendable que en el constructor solo se inicialicen las variables y en el ngOnInit el resto de cosas: llamadas a backend, preparación de los datos, filtrado, etc. */
  ngOnInit(): void {
    /* con este pipe del debounceTime() entonces se crea como una barrera de "se tiene que esperar 500ms = 0.5seg a ver si no recibe más valores, si no recibe más valores entonces continúa con el flujo y emite el resultado del observable pero si recibe más valores no emite nada del observable y se vuelve a esperar 0.5seg y así sucesivamente" */
    this.debouncer.pipe(debounceTime(500)).subscribe((value) => {
      // console.log('debouncer value', { value });
      this.handleDebouceSearchValueEmitter.emit(value);
    });
  }

  /* 1. tener la referencia del elemento HTML input. Se puede trabajar también sin el decorador @ViewChild ya que en este caso es un solo input, pero por fines de práctica se usó */
  // @ViewChild('searchInput')
  // public inputSearchRef!: ElementRef<HTMLInputElement>;

  // handleSearchValue(): void {
  //   const searchValue = this.inputSearchRef.nativeElement.value.trim();
  //   if (!searchValue) return;
  //   // console.log('SearchBoxComponent - handleSearchValue');
  //   // console.log({ searchValue });
  //   this.handleSearchValueEmitter.emit(searchValue);
  //   this.inputSearchRef.nativeElement.value = '';
  // }

  /* esta función ser un debouncer donde se podría utilizar el setInterval y como lo haríamos usualmente pero ya tenemos nuestras extensiones reactivas y el RxJS instalado en Angular por defecto */
  handleOnKeyPress(searchValue: string) {
    // console.log({ searchValue });

    if (!searchValue.trim()) return;
    /* hacer la emisión del observable de debouncer cada que se presiona una tecla y con next() para hacer la siguiente emosión del observable */
    this.debouncer.next(searchValue.trim());
  }
}
