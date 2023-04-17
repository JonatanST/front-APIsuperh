import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CreacionseresComponent } from './creacionseres/creacionseres.component';
import { MutantesComponent } from './mutantes/mutantes.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    InicioComponent,
    CreacionseresComponent,
    MutantesComponent,
    VehiculosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
  ],
  exports: [BrowserAnimationsModule, MatPaginatorModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
