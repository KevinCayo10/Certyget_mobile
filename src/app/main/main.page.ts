// Importa los módulos necesarios de Angular
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../home/services/service.service';
// Decorador que define el componente
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  // Inyección del servicio Router
  router = inject(Router);
  // Constructor que inyecta el servicio ServiceService
  constructor(private serviceCertificado: ServiceService) {}

  ngOnInit() {}
  // Método para realizar la redireccion a la pagina de busqueda de certificados
  buscar() {
    this.serviceCertificado.setCertificados([]);
    this.serviceCertificado.storeUserInfo('', '');
    this.router.navigateByUrl('/home');
  }
  // Método para navegar a la página de validación de certificados
  validar() {
    this.router.navigateByUrl('/validator');
  }
}
