import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [HomePageComponent, AboutPageComponent, SidebarComponent],
  exports: [HomePageComponent, AboutPageComponent, SidebarComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class SharedModule {}
