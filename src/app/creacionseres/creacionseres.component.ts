import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-creacionseres',
  templateUrl: './creacionseres.component.html',
  styleUrls: ['./creacionseres.component.css'],
})
export class CreacionseresComponent implements OnInit {
  datos: any;
  nuevoMutante: any = {};
  vehiculos: any;
  vehiculoSeleccionado: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/seres').subscribe((res: any) => {
      this.datos = res;
    });

    this.http
      .get<any[]>('http://localhost:3000/vehiculos')
      .subscribe((datos) => {
        this.vehiculos = datos;
      });
  }

  enviarDatos(event: Event) {
    event.preventDefault();

    if (!this.nuevoMutante.nombre) {
      Swal.fire({
        title: 'Error',
        text: 'El nombre es requerido',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!this.nuevoMutante.grupo) {
      Swal.fire({
        title: 'Error',
        text: 'El Grupo es Requerido',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!this.nuevoMutante.ciudad) {
      Swal.fire({
        title: 'Error',
        text: 'La ciudad es requerida',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!this.nuevoMutante.condicion) {
      Swal.fire({
        title: 'Error',
        text: 'La condición es requerida',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!this.nuevoMutante.tipo_superpoder) {
      Swal.fire({
        title: 'Error',
        text: 'El tipo de superpoder es requerido',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!this.nuevoMutante.vehiculo) {
      Swal.fire({
        title: 'Error',
        text: 'Debe especificar si el mutante tiene o no vehiculo',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    this.http
      .post('http://localhost:3000/seres', this.nuevoMutante)
      .subscribe((res: any) => {
        this.datos.push(res);
        this.nuevoMutante = {};
        Swal.fire({
          title: 'Éxito',
          text: 'Mutante creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      });
  }
}
