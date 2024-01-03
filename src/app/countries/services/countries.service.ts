import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { RegionType } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  /* el HttpClient es algo que no viene por defecto en Angular sino que es parte del HttpClientModule entonces hay que importar el módulo y como este HttpClientModule es algo que vamos a utilizar en toda la aplicación por el tema de las peticiones HTTP entonces se coloca en el imports del módulo principal que sería app.module.ts o sino sería en el módulo en donde lo vayamos a necesitar */
  /* se dijo que en el constructor es más que todo para la inyección de dependencias o inyectar un servicio pero en este caso como no es un componente y es un servicio entonces se puede hacer la carga inicial de algo aquí porque es parte de lo que quiero que se ejecute cuando se inicializa esta clase o servicio y en este caso se cargará la data del localStorage */
  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
  }

  private serviceURL: string = 'https://restcountries.com/v3.1';
  public countriesData: CountryInterface[] = [];

  public cacheStore: CacheStore = {
    byCapital: { searchValue: '', searchResponse: [] },
    byCountry: { searchValue: '', searchResponse: [] },
    byRegion: { searchResponse: [] },
  };

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(
      localStorage.getItem('cacheStore') ||
        `{
          byCapital: { searchValue: '', searchResponse: [] },
          byCountry: { searchValue: '', searchResponse: [] },
          byRegion: { searchResponse: [] },
         }`
    );
  }

  /* el diseño de las funciones cleanLocalStorage y cleanCacheStore estarían bien. cleanLocalStorage es el método público que se encarga de la limpieza del localStorage y de llamar al método privado cleanCacheStore para realizar la manipulación directa de los estados internos de la clase. Este diseño sigue el principio de encapsulación, ya que el método privado cleanCacheStore se encarga de realizar una tarea específica dentro de la clase, y el método público cleanLocalStorage se encarga de exponer la funcionalidad que el usuario de la clase debería utilizar. */
  private cleanCacheStore() {
    this.cacheStore = {
      byCapital: { searchValue: '', searchResponse: [] },
      byCountry: { searchValue: '', searchResponse: [] },
      byRegion: { searchResponse: [] },
    };
  }

  public cleanLocalStorage() {
    localStorage.removeItem('cacheStore');
    this.cleanCacheStore();
  }

  private handleGetCountriesRequest(
    url: string
  ): Observable<CountryInterface[]> {
    /* este this.httpClient.get() regresa un Observable entonces si se hace un return de eso hay que definir que la función handleSearchCapital_Service retornará algo de tipo Observable con un dato de tipo X que en este caso sería CountryInterface[]. Este Observable es como si fuera un Promise pero aquí lo trabajaremos de tipo Observable que es de la programación reactiva de RxJs */
    /* hasta ahí estamos configurando y definiendo la solicitud que haremos y el Observable que vamos a emitir pero hasta no suscribirse a ese Observable entonces no se ejecuta esa solicitud ni escucharemos los cambios que tenga. En este caso se hará la suscripción en by-capital-page.component.ts */
    /* los observables tienen un método llamado pipe que es poderoso y tiene varias cosas, por ejemplo, es un método donde se puede especificar diferentes operadores de RxJs. Se puede usar el tab, map, etc.... de RxJs pero aquí usaremos el catchError */

    return this.httpClient.get<CountryInterface[]>(url).pipe(
      catchError(() => of([])), // forma corta con return implícito y sin usar el error
      // catchError((error) => {
      //   console.log(error);
      //   /* regresar un nuevo observable usando el of() de RxJs que sirve para construir un nuevo observable a partir del argumento que se le manda, es decir, en este caso si hay un error entonces va a regresar un nuevo observable pero este será un arreglo vacío */
      //   return of([]);
      // })
      delay(1500) // darle 1500 milésimas de segundo de retraso para emitir el observable. No va a demorar 1500 ms en hacer la petición, sino que una vez que se emite el valor del observable va a tardar 1500 ms para que continúe el ciclo o flujo de información dentro de nuestro observable
    );
  }

  handleSearchCapital_Service(
    searchValue: string
  ): Observable<CountryInterface[]> {
    const capitalURL = `${this.serviceURL}/capital/${searchValue}`;

    /* como esto retorna un observable entonces se puede usar lógica de RxJS y usar los pipes para manejar lo que emite el observable. Aquí se va a disparar un efecto secundario con el operador tap(). Este tap() en pocas palabras es que cuando venga la información del observable entonces pasa por el tap() y ejecuta la lógica que tiene el tap() pero no va a influir en nada en el funcionamiento de la emisión que está haciendo el observable this.handleGetCountriesRequest(capitalURL) */
    return this.handleGetCountriesRequest(capitalURL).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = {
            searchValue: searchValue,
            searchResponse: countries,
          })
      ),
      /* se coloca aquí el saveToLocalStorage() porque en este punto recién se tiene la data y la respuesta del observable */
      tap(() => this.saveToLocalStorage())
    );
  }

  handleSearchCountry_Service(
    searchValue: string
  ): Observable<CountryInterface[]> {
    const countryURL = `${this.serviceURL}/name/${searchValue}`;

    return this.handleGetCountriesRequest(countryURL).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountry = {
            searchValue: searchValue,
            searchResponse: countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  handleSearchRegion_Service(
    searchValue: RegionType
  ): Observable<CountryInterface[]> {
    const regionURL = `${this.serviceURL}/region/${searchValue}`;

    return this.handleGetCountriesRequest(regionURL).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = {
            searchValue: searchValue,
            searchResponse: countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  /* FORMA 1: regresando un array con un elemento según como trabaja la API */
  /* este endpoint de la API al buscar por alpha code regresa un arreglo con el elemento porque así funciona la API: https://restcountries.com/v3.1/alpha/CRI (donde CRI es Costa Rica) así que es importante tener eso en cuenta. Aquí técnicamente deberíamos regresar un elemento y no en un arreglo aunque depende cómo queremos que trabaje nuestro código así que es relativo */
  // handleSearchCountryByAlphaCode_Service(
  //   searchAlphaCode: string
  // ): Observable<CountryInterface[]> {
  //   const byAlphaCodeURL = `${this.serviceURL}/alpha/${searchAlphaCode}`;

  //   return this.httpClient
  //     .get<CountryInterface[]>(byAlphaCodeURL)
  //     .pipe(catchError(() => of([])));
  // }

  /* FORMA 2: regresando un elemento usando RxJS y los pipes y el operador map() que sirve para transformar la información que recibe y retornar la información modificada o transformada */
  /* este endpoint de la API al buscar por alpha code regresa un arreglo con el elemento porque así funciona la API: https://restcountries.com/v3.1/alpha/CRI (donde CRI es Costa Rica) así que es importante tener eso en cuenta. Aquí técnicamente deberíamos regresar un elemento y no en un arreglo aunque depende cómo queremos que trabaje nuestro código así que es relativo */
  handleSearchCountryByAlphaCode_Service(
    searchAlphaCode: string
  ): Observable<CountryInterface | null> {
    const byAlphaCodeURL = `${this.serviceURL}/alpha/${searchAlphaCode}`;

    return this.httpClient.get<CountryInterface[]>(byAlphaCodeURL).pipe(
      map((response) => {
        // console.log({ response });
        /* regresar el primer elemento de arreglo o sino un null para manejar así mi código */
        return response.length > 0 ? response[0] : null;
      }),
      catchError(() => of(null))
    );
  }
}

/* ******************************************************************************************************************* */
/* En RxJS, los operadores no modifican el Observable original, lo que hacen es devolver un nuevo Observable. Los operadores de RxJS son funciones puras que toman un Observable como entrada y generan otro Observable como salida. Al suscribirte al Observable de salida también te suscribes al Observable de entrada. Entonces, aunque los objetos en JavaScript se pasen por referencia, los operadores de RxJS están diseñados para no modificar el Observable original. Así que sí, aún tienes un Observable original después de aplicar un operador de RxJS. Si deseas leer más detalles, puedes consultar la documentación de RxJS que te comparto a continuación. */
/* Aunque los objetos en JavaScript se pasan por referencia, los Observables en RxJS tienen un comportamiento especial. Cuando aplicas un operador a un Observable, no modificas el Observable original, en su lugar, como se mencionó anteriormente, se crea un nuevo Observable. Así que el Observable original se mantiene sin cambios. En cuanto a tu pregunta sobre si los Observables se pasan por referencia, la respuesta es sí. Pero debido a la forma en que están diseñados los operadores de RxJS, no modifican el Observable original. En vez de hacer eso, crean un nuevo Observable, por lo tanto, aunque el Observable se pasa por referencia, el Observable original no se modifica. */

/* ******************************************************************************************************************* */
/* La lógica que tenía cada archivo que se mencionará abajo, tenía la información de cada endpoint a usar, una ventaja era de que todo estaba encapsulado por componente y funcionalidad según lo que se necesite pero el problema es que al cambiar de ruta entonces el componente se va destruyendo y creando lo cual hace que al regresar a la ruta en la que se estaba, la información se destruya también y se inicialice de nuevo el componente desde cero.

- Para solucionar eso entonces se podría pasar toda esa lógica a este servicio ya que este se inicializa la primera vez y se crea su instancia y luego se puede utilizar como un estado general de la información de esta parte de la aplicación y como está proveído en el root ({ providedIn: 'root' }) entonces sobrevive al cambio de rutas porque al cambiar entre ruta y ruta usa la misma instancia de esta clase que vendría a ser un servicio.

- Otra forma sería hacer uso de los pipes ya que como se tienen observables y en los archivos mencionados abajo recién se suscriben entonces aquí en el servicio podemos hacer uso de RxJS para ir manejando la información que emite estos observables

- Otra forma también sería utilizar el localStorage ya que la información se guarda como en una base de datos interna del navegador lo cual hará que se conserve la información y luego mandar a llamar desde localStorage al cambiar entre rutas y al recargar la página

Archivos:
  1. by-capital-page.component.ts
  2. by-country-page.component.ts
  3. by-region-page.component.ts
*/

/* ******************************************************************************************************************* */
/* La diferencia entre providedIn: root, providedIn: platform, y providedIn: any está relacionada directamente con la forma en que se proporciona una instancia de un servicio y cómo se comparte esa instancia entre los componentes y módulos en una aplicación. (https://angular.io/guide/providers)

- providedIn: root: Singleton, una única instancia para toda la aplicación.
- providedIn: platform: Crea una instancia única para cada plataforma en la que se ejecute la aplicación.
- providedIn: any: Transitorio, crea una nueva instancia para cada componente que lo solicite.

La elección de cuál debes usar depende de la lógica de negocio y los requisitos de la aplicación. Normalmente, providedIn: root es la opción más común y recomendada para la mayoría de las aplicaciones, ya que proporciona una única instancia global que puede ser compartida y reutilizada eficientemente en toda la aplicación. Sin embargo, las otras opciones pueden ser útiles en casos específicos donde se necesite tener diferentes instancias del servicio según la plataforma o el componente que lo solicite. */
