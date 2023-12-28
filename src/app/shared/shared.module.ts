import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [HomePageComponent, AboutPageComponent],
  exports: [HomePageComponent, AboutPageComponent],
  imports: [CommonModule],
})
export class SharedModule {}
