import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mutantes',
  templateUrl: './mutantes.component.html',
  styleUrls: ['./mutantes.component.css'],
})
export class MutantesComponent {
  datos: any[] = [];

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.datos.length,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/seres').subscribe((data: any) => {
      this.datos = data;
      console.log(this.datos); // Verifica los datos en la consola
    });
  }
}
