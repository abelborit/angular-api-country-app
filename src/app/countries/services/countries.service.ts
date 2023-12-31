import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from '../interfaces/country.interface';
import { Observable } from 'rxjs';

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
    return this.httpClient.get<CountryInterface[]>(capitalURL);
  }
}
