import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-shared-components-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Input()
  public placeholderProp: string = 'Search here...';

  /* 2. emitir el valor del input al padre */
  @Output()
  public handleSearchValueEmitter: EventEmitter<string> = new EventEmitter();

  /* 1. tener la referencia del elemento HTML input. Se puede trabajar también sin el decorador @ViewChild ya que en este caso es un solo input, pero por fines de práctica se usó */
  @ViewChild('searchInput')
  public inputSearchRef!: ElementRef<HTMLInputElement>;

  handleSearchValue(): void {
    const searchValue = this.inputSearchRef.nativeElement.value.trim();
    if (!searchValue) return;

    console.log('SearchBoxComponent - handleSearchValue');
    console.log({ searchValue });
    this.handleSearchValueEmitter.emit(searchValue);

    this.inputSearchRef.nativeElement.value = '';
  }
}
