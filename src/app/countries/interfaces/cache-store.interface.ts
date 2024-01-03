import { CountryInterface } from './country.interface';
import { RegionType } from './region.type';

export interface CacheStore {
  byCapital: SearchCountriesInterface;
  byCountry: SearchCountriesInterface;
  byRegion: SearchRegionInterface;
}

export interface SearchCountriesInterface {
  searchValue: string;
  searchResponse: CountryInterface[];
}

export interface SearchRegionInterface {
  /* se coloca como opcional ya que al principio puede no estar seleccionada ninguna opción de las regiones */
  searchValue?: RegionType;
  searchResponse: CountryInterface[];
}
