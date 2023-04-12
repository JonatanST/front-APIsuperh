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
}
