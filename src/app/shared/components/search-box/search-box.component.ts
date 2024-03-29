import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  // ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-shared-components-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  /* un Subject es un tipo especial de Observable, es como crear un observable manualmente y podamos suscribirnos, usar los pipe, etc. */
  private debouncer: Subject<string> = new Subject<string>();
  /* técnicamente manejaremos la suscripción de manera independiente y que sea opcional porque puede ser que no tenga ninguna suscripción ya que cuando se crea el componente aún no lo tenemos. Es de tipo Subscription porque el subscribe dará algo de tipo Subscription entonces para que tenga el mismo tipado y se pueda usar de la mejor forma y sea algo igual a lo que retorna el suscription del observable */
  private debouncerSuscription?: Subscription;

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
    /* cuando se tenga un subscribe sin contar el de los servicios (nombre.service.ts), entonces se tiene que hacer la limpieza de esas suscripciones ya que, por ejemplo, en este caso el debouncer va a estar escuchando esas suscripciones a pesar de que el componente ya no exista, técnicamente no se va a lanzar el emit porque el componente ya no existe pero de igual forma es buena práctica realizar la limpieza */
    /* básicamente se hará de esta forma cuando se haya implementado una suscripción en el ngOnInit() o en cualquier parte del componente y esté escuchando los cambios o emisiones respectivas. Esto no haremos cuando se usa el httpClient o lo que venga de @angular/common/http y las peticiones get, post, put, delete ya que ahí viene una forma de autocerrar esas suscripciones usando el pipe take(), ya no tenemos que hacerlo nosotros porque eso ya viene por defecto porque los creadores de ese paquete ya lo colocaron ya que saben que se hará la petición y ya no se escuchará nada más después de eso y automáticamente lo cancelan usando ese take() que sirve para cancelar la suscripción tan pronto como se reciba un valor no como en este caso que sabemos cuando vamos a emitir pero no cuando se va a terminar ya que eso se dará cuando se destruya el componente y por eso lo hicimos de esta forma y este es un concepto que nos ayuda a mantener la memoria de los observables al mínimo ya que limpiará la suscripción y evitará que se siga escuchando así el componente no esté visible */
    this.debouncerSuscription = this.debouncer
      .pipe(
        /* con este pipe del debounceTime() entonces se crea como una barrera de "se tiene que esperar 500ms = 0.5seg para ver si no se reciben más valores, si no reciben más valores entonces continúa con el flujo y emite el resultado del observable pero si reciben más valores no emite nada del observable y se vuelve a esperar 0.5seg y así sucesivamente" */
        debounceTime(500)
      )
      .subscribe((value) => {
        // console.log('debouncer value', { value });
        this.handleDebouceSearchValueEmitter.emit(value);
      });
  }

  /* ngOnDestroy es parte del ciclo de vida de los componentes de Angular y se dispara cuando la instancia del componente va a ser destruida. Cuando se va de una página a otra o cuando se usa en *ngIf, por ejemplo, Angular va a llamar a todos los ngOnDestroy de todos los componentes que se estén utilizando en esa página */
  ngOnDestroy(): void {
    // console.log('destroy');
    this.debouncerSuscription?.unsubscribe();
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

/* ******************************************************************************************************************* */
/* ¿Cuál es la diferencia entre usar unsubscribe() con la variable debouncerSuscription y no directamente con debouncer? */
/* Técnicamente podríamos, pero normalmente se trabaja cada suscripción de forma individual porque: */
/*
Nuestra variable debouncer es el propio Subject y debouncerSuscription de tipo Subscription. La propia Subscription es lo que nos va a retornar al hacer debouncer.subscribe(), esta es independiente y por cada debouncer.subscribe nos va a devolver una Subscription, cada una de estas es única, no es una para todos.

Cuando se hace debouncerSuscription.unsubscribe() estamos manipulando únicamente esa Subscription individual, sin afectar a cualquier otra que tengamos en la aplicación ya que cuando se hace debouncer.unsubscribe() ocurren varias cosas mas por ejemplo:
  - La primera, todas las Subscriptions que tengas activas en ese Observable efectivamente se limpian, esa parte sería la misma y nos sirve perfectamente.
  - Luego, hacer el .unsubscribe() del debouncer hace que no puedas volver a hacer debouncer.subscribe() o hacer un .next() y pasar un nuevo valor, ya que te dará error al haber hecho el .unsubscribe() del debouncer global, es como si lo desactiváramos y ya no podremos interactuar con él mismo.

Si únicamente tienes una subscription y ese debouncer está aislado en un único componente, podrías hacer el .unsubscribe() gobal del debouncer y en principio no deberías de tener inconveniente, ya que al destruir y volver a construir el componente tendríamos un nuevo debouncer y ahí ya no nos daría error.

Aun así, aunque funcione, sigue siendo recomendable trabajar independientemente en cada subscription, ya que otro desarrollador podrá entender más fácilmente el código, y usar el .unsubscribe() global únicamente cuando requieras de esas características.
*/

/* ******************************************************************************************************************* */
/* Bajo la idea anterior donde se indica realizar un unsubscribe() de los observables excepto los realizados por una petición http, ¿También se debería hacer cuando se llama el subscribe() de un activeRoute para obtener los parametros que llegan por Url? */
/* En el caso de los activeRoute contaría como excepción y no haría falta hacer lo mismo de ahora, ya que Angular se encargará de limpiarlo cuando el componente se destruya. */

/* ******************************************************************************************************************* */
/*
En handleOnKeyPress se emiten valores tan pronto como el usuario escribe en el cuadro de búsqueda, mientras que en ngOnInit, se configura una suscripción que emitirá el último valor después de un retraso de 500 milisegundos, asegurando que la búsqueda se realice de manera más eficiente y sin sobrecargar el sistema con búsquedas innecesarias.

    El motivo principal para configurar la suscripción al Subject y aplicar el retraso en el método ngOnInit es garantizar que esta configuración se realice una sola vez cuando el componente esté inicializado y listo para ser utilizado.

    El método ngOnInit es parte del ciclo de vida de un componente en Angular y se llama una vez que Angular ha inicializado todas las propiedades de entrada (@Input) y se ha establecido la vista del componente. Esto garantiza que el componente esté completamente inicializado y listo para realizar cualquier acción necesaria.

    Al configurar la suscripción al Subject y aplicar el retraso en ngOnInit, nos aseguramos de que esta configuración se realice solo una vez, evitando la posibilidad de múltiples suscripciones o retrasos innecesarios cada vez que se invoque un método que cause un ciclo de detección de cambios en Angular.

    Además, al realizar esta configuración en ngOnInit, seguimos el principio de separación de preocupaciones y mantenemos el método handleOnKeyPress enfocado únicamente en manejar los eventos directos del cuadro de búsqueda, mientras que la lógica de retraso se maneja en un lugar separado, lo que mejora la claridad y la mantenibilidad del código.

    En resumen, al realizar la configuración en ngOnInit, estamos siguiendo las mejores prácticas de Angular y garantizando que la lógica se configure de manera eficiente y efectiva durante la inicialización del componente.

En handleOnKeyPress el método next() es parte de la interfaz de un Subject en RxJS y se utiliza para emitir un nuevo valor a los observadores suscritos a ese Subject.

    Cuando el usuario escribe algo en el cuadro de búsqueda y presiona una tecla, el método handleOnKeyPress(searchValue: string) se llama, y dentro de este método, this.debouncer.next(searchValue.trim()) se utiliza para emitir ese valor al Subject debouncer.

    Este patrón de usar next() para emitir valores es común en la programación reactiva y es la forma en que se propaga la información a través de secuencias observables en RxJS. Una vez que se emite un valor, cualquier observador suscrito a ese Subject recibirá ese valor y puede realizar acciones en consecuencia. En este caso particular, el valor emitido por next() se suscribirá más adelante en el método ngOnInit con subscribe(), donde se aplicará un retraso antes de que se emita a través del evento handleDebouceSearchValueEmitter.
*/

/* ******************************************************************************************************************* */
/* Aquí se utiliza el subject y no el observable porque: */
/*
- Al usar observables se crea una nueva instancia de Observable para cada evento de búsqueda, es decir, cada vez que se presiona una tecla en el campo de búsqueda se crea un nuevo Observable con la consulta de búsqueda actual esto significa que cada tecla presionada genera una nueva instancia de Observable.

- Al usar Subject, se utiliza un Subject único que maneja todos los eventos de búsqueda, es decir, cada vez que se presiona una tecla en el campo de búsqueda, se llama al método next() del Subject con la consulta de búsqueda actual. Esto emite el valor directamente a través del Subject. */

/* Implementación a muy alto nivel de cómo podría ser con observables: */
/*
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-shared-components-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholderProp: string = 'Search here...';

  @Output()
  public handleDebouncedSearchValueEmitter: EventEmitter<string> =
    new EventEmitter();

  ngOnInit(): void {
    const searchQuery$: Observable<string> = new Observable<string>((observer) => {
      observer.next('');
    });

    this.debouncerSubscription = this.setupDebouncer(searchQuery$)
      .subscribe((value) => {
        this.handleDebouncedSearchValueEmitter.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  handleOnKeyPress(searchValue: string) {
    if (!searchValue.trim()) return;
    this.setupDebouncer(new Observable<string>((observer) => {
      observer.next(searchValue.trim());
    }));
  }

  setupDebouncer(searchQuery$: Observable<string>): Observable<string> {
    return searchQuery$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((query: string) => query)
    );
  }
}
*/
