import { Component } from '@angular/core';

@Component({
  selector: 'app-countries-pages-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent {
  handleSearchByCapital(searchValue: string): void {
    console.log('ByCapitalPageComponent - handleSearchByCapital');
    console.log({ searchValue });
  }
}
