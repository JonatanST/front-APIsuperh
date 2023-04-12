import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
})
export class VehiculosComponent {
  datos: any[] = [];
  nuevoVehiculo: any = {};

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

  eliminarDato(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este elemento?')) {
      this.http
        .delete(`http://localhost:3000/vehiculos/${id}`)
        .subscribe(() => {
          this.datos = this.datos.filter((item: any) => item.id !== id);
        });
    }
  }

  /* Metodo para crear vehiculos nuevos */
  enviarDatos(form: HTMLFormElement): Observable<any> {
    const nuevoVehiculo = {
      nombre: form['nombre'].value,
    };
    return this.http
      .post('http://localhost:3000/vehiculos', nuevoVehiculo)
      .pipe(
        map((res: any) => {
          this.datos.push(res);
          this.nuevoVehiculo = {};
          return res;
        }),
        catchError((error: any) => {
          console.error(error);
          throw error;
        })
      );
  }

  mostrarFormulario() {
    Swal.fire({
      title: 'Formulario',
      html:
        '<form id="formulario">' +
        '<div class="form-group">' +
        '<label for="nombre">Nombre Vehículo:</label>' +
        '<input type="text" class="form-control" id="nombre" [(ngModel)]="nuevoVehiculo.nombre" name="nombre" required />' +
        '</div>' +
        '</form>',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        return new Promise<void>((resolve, reject) => {
          const form = document.getElementById('formulario') as HTMLFormElement;
          const nombre = form['nombre'].value;

          // Validar si el vehículo ya existe
          if (this.datos.some((item: any) => item.nombre === nombre)) {
            const input = document.getElementById('nombre') as HTMLInputElement;
            input.value = '';
            Swal.showValidationMessage('Este vehículo ya se encuentra registrado.');
            reject('Vehículo duplicado');
            return;
          }
          this.enviarDatos(form)
            .toPromise()
            .then(
              (res: any) => {
                this.datos.push(res);
                this.nuevoVehiculo = {};
                Swal.fire({
                  title: '¡Vehículo creado!',
                  icon: 'success',
                });
                setTimeout(() => {
                  window.location.reload();
                }, 2000); // espera 3 segundos antes de recargar la página
                resolve();
              },
              (error) => {
                reject(error);
              }
            );
        });
      },
    });
  }
}
