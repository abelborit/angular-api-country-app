# Angular & TypeScript - Angular Api Country App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección veremos los fundamentos de una aplicación SPA (Single Page Application), y luego, las seguiremos haciendo pero mediante carga perezosa (lazyload). Estaremos viendo:

- Rutas
- RouterLink y RouterLinkActive
- Componentes especializados
- DebounceTime
- Inputs
- SwitchMaps
- Consumo de APIs
- Tipado de datos
- Menú de aplicación

Aquí continuaremos la aplicación de países, pero enfocados en la parte de las sugerencias, debounce y mantener el estado de las consultas, los temas serán:

- ngClass y diferentes formas de manipular clases
- CSS condicionales
- Optimizaciones a peticiones HTTP
- Debounce manual mediante RxJs
- LocalStorage
- Ideas de Store
- Re-utilización de componentes
- Varios operadores de RxJS aplicados

### \* RECURSOS A USAR:

- Bootstrap (CDN): https://getbootstrap.com/
  ```html
  <!-- Bootstrap CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  ```
- del-cli: https://www.npmjs.com/package/del-cli
  - `npm i del-cli`
- copyfiles: https://www.npmjs.com/package/copyfiles
  - `npm i copyfiles`

### \* NOTAS:

- Se añadirán algunos scrips en el package.json para que al hacer el build se cree la carpeta docs y también que en el index.html del buils en el <base href="/" /> se coloque <base href="./" /> para no tener problemas con los archivos al subirlo a GitHub Pages.

---

# AngularApiCountryApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
