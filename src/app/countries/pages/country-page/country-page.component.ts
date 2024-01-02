import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries-pages-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  /* inyectar servicios y tener en consideración que hay algunos por ejemplo como los que son sin observables y otros que toman como un snapshot de cómo se encuentra el observable o el url y no son un obervable. Como recomendación sería trabajar con los observables porque las personas pueden cambiar dinámicamente el url con le que se está trabajando y nuestra aplicación no necesariamente se va a recargar y como no se recarga entonces no se vuelve a tomar el snapshot del url y puede mostrar información al usuario que no es correcta, así que es bien específico trabajar con los snapshot de la url pero en este caso lo trabajaremos de otra forma más general usando el servicio de ActivatedRoute y de sus propiedades como el params que es un observable */
  /* técnicamente no querremos hacer código de verificaciones en el constructor porque el constructor es un punto en el ciclo de vida de los componentes de Angular donde aún no se creó el HTML ya que recién se están creando entonces vamos a querer que se haga algo en el inicio de nuestra aplicación y usaremos el implements OnInit para que por ejemplo, al momento de que se está cargando la data entonces aparezca un loading o algo por el estilo */
  /* también se inyectará el servicio de countries.service.ts */
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    /* los params de por sí es un observable entonces tenemos que suscribirnos. Estos params serán de tipo Params que viene de @angular/router aunque no es necesario colocar el tipo ya que implícitamente sabe que es ese tipo Params */
    this.activatedRoute.params.subscribe((params: Params) => {
      /* aquí lo hacemos de esa forma para hacerlo mediante propiedad computada ya que si lo hacemos como params.id entonces le estamos diciento que viene una propiedad id pero no sabe que tiene esa propiedad como tal por el tipado estricto y nos lanza un error o sino también se puede desestructurar el params y quedaría con { id } y se utiliza de forma directa y quedaría un poco más limpio. Luego de utilizar el servicio entonces para hacer la petición y que se dispare nos tenemos que suscribir a la misma */
      // console.log({ params: params['id'] });

      /* darse cuenta que aquí tenemos un observable hell, es decir, un observable dentro de otro observable o múltiples observables anidados o encadenados porque para el observable interno usamos el valor de respuesta del observable exterior */
      this.countriesService
        .handleSearchCountryByAlphaCode_Service(params['id'])
        .subscribe((response) => {
          console.log({ response });
        });
    });
  }
}
