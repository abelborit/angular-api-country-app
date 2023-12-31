import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from '../interfaces/country.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  /* el HttpClient es algo que no viene por defecto en Angular sino que es parte del HttpClientModule entonces hay que importar el módulo y como este HttpClientModule es algo que vamos a utilizar en toda la aplicación por el tema de las peticiones HTTP entonces se coloca en el imports del módulo principal que sería app.module.ts o sino sería en el módulo en donde lo vayamos a necesitar */
  constructor(private httpClient: HttpClient) {}

  private serviceURL: string = 'https://restcountries.com/v3.1';
  public countriesData: CountryInterface[] = [];

  handleSearchCapital_Service(
    searchValue: string
  ): Observable<CountryInterface[]> {
    const capitalURL = `${this.serviceURL}/capital/${searchValue}`;
    /* este this.httpClient.get() regresa un Observable entonces si se hace un return de eso hay que definir que la función handleSearchCapital_Service retornará algo de tipo Observable con un dato de tipo X que en este caso sería CountryInterface[]. Este Observable es como si fuera un Promise pero aquí lo trabajaremos de tipo Observable que es de la programación reactiva de RxJs */
    /* hasta ahí estamos configurando y definiendo la solicitud que haremos y el Observable que vamos a emitir pero hasta no suscribirse a ese Observable entonces no se ejecuta esa solicitud ni escucharemos los cambios que tenga. En este caso se hará la suscripción en by-capital-page.component.ts */
    /* los observables tienen un método llamado pipe que es poderoso y tiene varias cosas, por ejemplo, es un método donde se puede especificar diferentes operadores de RxJs. Se puede usar el tab, map, etc.... de RxJs pero aquí usaremos el catchError */
    return this.httpClient.get<CountryInterface[]>(capitalURL).pipe(
      // catchError(() => of([])), // forma corta con return implícito y sin usar el error
      catchError((error) => {
        console.log(error);
        /* regresar un nuevo observable usando el of() de RxJs que sirve para construir un nuevo observable a partir del argumento que se le manda, es decir, en este caso si hay un error entonces va a regresar un nuevo observable pero este será un arreglo vacío */
        return of([]);
      })
    );
  }
}

/* En RxJS, los operadores no modifican el Observable original, lo que hacen es devolver un nuevo Observable. Los operadores de RxJS son funciones puras que toman un Observable como entrada y generan otro Observable como salida. Al suscribirte al Observable de salida también te suscribes al Observable de entrada. Entonces, aunque los objetos en JavaScript se pasen por referencia, los operadores de RxJS están diseñados para no modificar el Observable original. Así que sí, aún tienes un Observable original después de aplicar un operador de RxJS. Si deseas leer más detalles, puedes consultar la documentación de RxJS que te comparto a continuación. */
/* Aunque los objetos en JavaScript se pasan por referencia, los Observables en RxJS tienen un comportamiento especial. Cuando aplicas un operador a un Observable, no modificas el Observable original, en su lugar, como se mencionó anteriormente, se crea un nuevo Observable. Así que el Observable original se mantiene sin cambios. En cuanto a tu pregunta sobre si los Observables se pasan por referencia, la respuesta es sí. Pero debido a la forma en que están diseñados los operadores de RxJS, no modifican el Observable original. En vez de hacer eso, crean un nuevo Observable, por lo tanto, aunque el Observable se pasa por referencia, el Observable original no se modifica. */
