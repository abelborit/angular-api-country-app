import { Component, Input } from '@angular/core';
import { CountryInterface } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-component-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
})
export class CountryTableComponent {
  @Input()
  public countriesList: CountryInterface[] = [];
}
