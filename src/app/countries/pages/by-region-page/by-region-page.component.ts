import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-pages-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public regionSearchedValue: string = '';
  public countriesData: CountryInterface[] = [];

  handleSearchByRegion(searchValue: string): void {
    // console.log('ByRegionPageComponent - handleSearchByRegion');
    // console.log({ searchValue });
    this.regionSearchedValue = searchValue;

    this.countriesService
      .handleSearchRegion_Service(searchValue)
      .subscribe((response) => {
        // console.log(response);
        this.countriesData = response;
      });
  }
}
