import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-pages-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public capitalSearchedValue: string = '';
  public countriesData: CountryInterface[] = [];

  handleSearchByCapital(searchValue: string): void {
    // console.log('ByCapitalPageComponent - handleSearchByCapital');
    // console.log({ searchValue });
    this.capitalSearchedValue = searchValue;

    this.countriesService
      .handleSearchCapital_Service(searchValue)
      .subscribe((response) => {
        // console.log(response);
        this.countriesData = response;
      });
  }
}
