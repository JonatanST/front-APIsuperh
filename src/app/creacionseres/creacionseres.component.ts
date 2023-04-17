import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-creacionseres',
  templateUrl: './creacionseres.component.html',
  styleUrls: ['./creacionseres.component.css']
})
export class CreacionseresComponent implements OnInit{
  datos: any;
  nuevoMutante: any = {};
  vehiculos: any;
  vehiculoSeleccionado: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000/seres').subscribe((res: any) => {
      this.datos = res;
    });

    this.http.get<any[]>('http://localhost:3000/vehiculos').subscribe(datos => {
      this.vehiculos = datos;
    });
  }
  /* Metodo para crear mutantes nuevos */
  enviarDatos(event: Event) {
    event.preventDefault();
    this.http.post('http://localhost:3000/seres', this.nuevoMutante).subscribe((res: any) => {
      this.datos.push(res);
      this.nuevoMutante = {};
    });
  }

}
