import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

/* con todo esto ya tengo un módulo independiente especializado en la navegación de la aplicación */
const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

/* si este es nuestro sistema de rutas principal o si es el primer sistema de routing de la aplicación que estamos haciendo entonces colocaremos .forRoot(nuestras_rutas). Si es otros sistema de routing entonces se colocaría .forChild() */
/* se exporta RouterModule ya que es la configuración que estamos haciendo y esto tendría que ser utilizado en el módulo principal de mi aplicación */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
