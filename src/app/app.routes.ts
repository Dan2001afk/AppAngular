import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './Pages/ErrorView/page-not-found/page-not-found.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EstudianteComponent } from './Pages/estudiante/estudiante.component';
import { HeaderComponent } from './Pages/header/header.component';

export const routes: Routes = [
  // {path: '',   redirectTo: '/Inicio', pathMatch: 'full' },
  {path: '', component: InicioComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Estudiante/:id', component: EstudianteComponent},
  {path: '**', component: PageNotFoundComponent},
];
