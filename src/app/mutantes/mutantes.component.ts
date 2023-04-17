import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mutantes',
  templateUrl: './mutantes.component.html',
  styleUrls: ['./mutantes.component.css'],
})
export class MutantesComponent {
  datos: any[] = [];
  busqueda: string = '';
  busqueda2: string = '';
  nuevoMutante: any = {};
  vehiculos: any;
  vehiculoSeleccionado: any;

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.datos.length,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/seres').subscribe((data: any) => {
      this.datos = data;
      console.log(this.datos); // Ver los datos en la consola
    });

    this.http.get('http://localhost:3000/seres').subscribe((res: any) => {
      this.datos = res;
    });

    this.http
      .get<any[]>('http://localhost:3000/vehiculos')
      .subscribe((datos) => {
        this.vehiculos = datos;
      });
  }

  /*Metodo para eliminar un mutante*/
  eliminarDato(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este elemento?')) {
      this.http.delete(`http://localhost:3000/seres/${id}`).subscribe(() => {
        this.datos = this.datos.filter((item: any) => item.id !== id);
      });
    }
  }

  /* Metodo para editar datos nombre y ciudad del mutante*/
  editarSeres(item: any) {
    Swal.fire({
      title: 'Editar ser',
      html:
        '<label>Nombre:</label><br><input id="swal-input1" class="swal2-input" style="display:flex" value="' +
        item.nombre +
        '">' +
        '<label>Ciudad:</label><br><input id="swal-input2" class="swal2-input" style="display:flex" value="' +
        item.ciudad +
        '">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
        ];
      },
    }).then((result: any) => {
      if (result.value) {
        item.nombre = result.value[0];
        item.ciudad = result.value[1];
        this.http.put(`http://localhost:3000/seres/${item.id}`, item).subscribe(
          (response: any) => {
            console.log(response);
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }

  /* Metodo para editar o asignar Vehiculo a Mutantes */
  editarVehiculo(item: any) {
    this.http
      .get<any[]>('http://localhost:3000/vehiculos')
      .subscribe((datos) => {
        // Crear un array con los nombres de los vehículos
        const nombresVehiculos = datos.map((v) => v.nombre);
        Swal.fire({
          title: 'Editar o Asignar Vehículo',
          html:
            '<label> ¿Vehículo? </label><br><select id="swal-input1" class="form-select" value="' +
            item.vehiculo +
            '">' +
            '<option value="Si tiene">Si tiene</option>' +
            '<option value="No tiene">No tiene</option>' +
            '<option value="Desconocido">Desconocido</option>' +
            '</select>' +
            '<label>Nombre Vehículo:</label><br><select id="swal-input2" class="form-select" value="' +
            item.nombre_vehiculo +
            '">' +
            '<option value="">Seleccione un vehículo</option>' +
            nombresVehiculos
              .map(
                (nombre) =>
                  '<option value="' + nombre + '">' + nombre + '</option>'
              )
              .join('') +
            '</select>',
          focusConfirm: false,
          preConfirm: () => {
            return [
              (document.getElementById('swal-input1') as HTMLInputElement)
                .value,
              (document.getElementById('swal-input2') as HTMLInputElement)
                .value,
            ];
          },
        }).then((result: any) => {
          if (result.value) {
            item.vehiculo = result.value[0];
            item.nombre_vehiculo = result.value[1];
            this.http
              .put(`http://localhost:3000/seres/${item.id}`, item)
              .subscribe(
                (response: any) => {
                  console.log(response);
                },
                (error: any) => {
                  console.log(error);
                }
              );
          }
        });
      });
  }

  /* Metodo Para busqueda por nombre */
  buscarMutante() {
    if (this.busqueda.trim() !== '') {
      this.datos = this.datos.filter((mutante) => {
        return mutante.nombre
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }
  /* Metodo Para busqueda por ciudad */
  buscarCiudad() {
    if (this.busqueda2.trim() !== '') {
      this.datos = this.datos.filter((mutante) => {
        return mutante.ciudad
          .toLowerCase()
          .includes(this.busqueda2.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  /* Metodo para crear mutantes nuevos */
  enviarDatos(event: Event) {
    event.preventDefault();
    this.http
      .post('http://localhost:3000/seres', this.nuevoMutante)
      .subscribe((res: any) => {
        this.datos.push(res);
        this.nuevoMutante = {};
      });
  }
}
