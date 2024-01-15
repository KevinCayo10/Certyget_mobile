import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../home/services/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router = inject(Router);
  constructor(private serviceCertificado: ServiceService) {}

  ngOnInit() {}
  buscar() {
    this.serviceCertificado.setCertificados([]);
    this.serviceCertificado.storeUserInfo('', '');
    this.router.navigateByUrl('/home');
  }
  validar() {
    this.router.navigateByUrl('/validator');
  }
}
