import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Detectar cuando la ruta cambia
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtener el elemento activo
        const activeElement = document.querySelector('.navegacion-item.active');
        // Quitar la clase active del elemento activo
        if (activeElement) {
          activeElement.classList.remove('active');
        }
        // Agregar la clase active al elemento actual
        const currentElement = document.querySelector(`.navegacion-item a[href='${event.urlAfterRedirects}']`)?.parentElement;
        if (currentElement) {
          currentElement.classList.add('active');
        }
      }
    });
  }

  toggleActive(element: HTMLElement) {
    // Obtener el elemento activo
    const activeElement = document.querySelector('.navegacion-item.active');
    // Quitar la clase active del elemento activo
    if (activeElement) {
      activeElement.classList.remove('active');
    }
    // Agregar la clase active al elemento seleccionado
    element.classList.add('active');
  }

}
