import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CreacionseresComponent } from './creacionseres/creacionseres.component';
import { MutantesComponent } from './mutantes/mutantes.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'creacionseres', component: CreacionseresComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mutantes', component: MutantesComponent },
  { path: 'vehiculos', component: VehiculosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
