import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CacheStore } from 'src/app/countries/interfaces/cache-store.interface';
import { CountriesService } from 'src/app/countries/services/countries.service';

@Component({
  selector: 'app-shared-components-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) {}

  handleCleanStorage(): void {
    this.countriesService.cleanLocalStorage();
    this.router.navigateByUrl('/by-capital');
  }

  get getAllInfoCountries(): CacheStore {
    return this.countriesService.cacheStore;
  }
}
