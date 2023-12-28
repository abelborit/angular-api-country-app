import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

/* con todo esto ya tengo un módulo independiente especializado en la navegación de la aplicación */
const routes: Routes = [
  /* en vez de los string vacíos en '' que significan que ya están en el path inicial, se podría colocar también 'home' o 'principal' o algo que haga referencia a la página inicial pero por conveniencia se colocará '' */
  /* en estas rutas también pueden tener subrutas y componentes hijos, y sería utilizar children: [{ path: 'childrenPath', component: childrenComponente }], */
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  /* en las rutas de Angular el framework verifica secuencialmente cuál coincide con la ruta actual que se está solicitando. Al colocar el comodín de cualquier ruta antes de la ruta solicitada, Angular accederá a esa ruta comodín en lugar de la ruta solicitada. Por eso se coloca la ruta comodín al final para evitar este tipo de problemas. */
  {
    path: '**',
    redirectTo: '',
  },
];

/* si este es nuestro sistema de rutas principal o si es el primer sistema de routing de la aplicación que estamos haciendo entonces colocaremos .forRoot(nuestras_rutas). Si es otros sistema de routing entonces se colocaría .forChild(). El .forRoot() solo hay uno en toda la aplicación del cual se desprenden los demás routers. Cualquier otro router será .forChild() que habilita las rutas hijas, que prácticamente las rutas creadas después de las rutas principales serán rutas hijas */
/* se exporta RouterModule ya que es la configuración que estamos haciendo y esto tendría que ser utilizado en el módulo principal de mi aplicación */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
