import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-pages-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public countrySearchedValue: string = '';
  public countriesData: CountryInterface[] = [];

  ngOnInit(): void {
    /* se podría colocar en el constructor pero en el constructor es más que todo para inyección de dependencias y no tanto para cargar cosas del servicio, para eso usamos el OnInit y ngOnInit */
    this.countrySearchedValue =
      this.countriesService.cacheStore.byCountry.searchValue;

    this.countriesData =
      this.countriesService.cacheStore.byCountry.searchResponse;
  }

  handleSearchByCountry(searchValue: string): void {
    // console.log('ByCountryPageComponent - handleSearchByCountry');
    // console.log({ searchValue });
    this.countrySearchedValue = searchValue;

    this.countriesService
      .handleSearchCountry_Service(searchValue)
      .subscribe((response) => {
        // console.log(response);
        this.countriesData = response;
      });
  }
}
