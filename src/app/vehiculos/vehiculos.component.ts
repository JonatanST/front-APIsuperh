import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {
  datos: any[] = [];

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.datos.length,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/vehiculos').subscribe((data: any) => {
      this.datos = data;
      console.log(this.datos); // Verifica los datos en la consola
    });
  }

}
