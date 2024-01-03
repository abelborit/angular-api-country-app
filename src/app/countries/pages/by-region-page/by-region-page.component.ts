import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country.interface';
import { RegionType } from '../../interfaces/region.type';

@Component({
  selector: 'app-countries-pages-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  /* inyectar el servicio de CountriesService en el constructor() */
  constructor(private countriesService: CountriesService) {}

  public regionSearchedValue?: string;
  public countriesData: CountryInterface[] = [];
  public regions: RegionType[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: RegionType;

  ngOnInit(): void {
    /* se podría colocar en el constructor pero en el constructor es más que todo para inyección de dependencias y no tanto para cargar cosas del servicio, para eso usamos el OnInit y ngOnInit */
    this.regionSearchedValue =
      this.countriesService.cacheStore.byRegion.searchValue;

    this.countriesData =
      this.countriesService.cacheStore.byRegion.searchResponse;
  }

  handleSearchByRegion(searchValue: RegionType): void {
    // console.log('ByRegionPageComponent - handleSearchByRegion');
    // console.log({ searchValue });
    this.selectedRegion = searchValue;
    this.regionSearchedValue = searchValue;

    this.countriesService
      .handleSearchRegion_Service(searchValue)
      .subscribe((response) => {
        // console.log(response);
        this.countriesData = response;
      });
  }
}
