import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-pages-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public countrySearchedValue: string = '';
  public countriesData: CountryInterface[] = [];

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
