import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-pages-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public capitalSearchedValue: string = '';
  public countriesData: CountryInterface[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    /* se podría colocar en el constructor pero en el constructor es más que todo para inyección de dependencias y no tanto para cargar cosas del servicio, para eso usamos el OnInit y ngOnInit */
    this.capitalSearchedValue =
      this.countriesService.cacheStore.byCapital.searchValue;

    this.countriesData =
      this.countriesService.cacheStore.byCapital.searchResponse;
  }

  handleSearchByCapital(searchValue: string): void {
    this.isLoading = true;
    // console.log('ByCapitalPageComponent - handleSearchByCapital');
    // console.log({ searchValue });
    this.capitalSearchedValue = searchValue;

    this.countriesService
      .handleSearchCapital_Service(searchValue)
      .subscribe((response) => {
        // console.log(response);
        this.countriesData = response;
        /* cuando acabe la petición y ya tenga el resultado ya sea positivo o negativo (array con los elementos o un array vacío) entonces cambiar el isLoading */
        this.isLoading = false;
      });
  }
}
