import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  router = inject(Router);
  form = new FormGroup({
    apellidos: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    cedula: new FormControl('', [
      Validators.required, // Ensure it's 10 digits and numeric
    ]),
  });

  constructor(private serviceCertificado: ServiceService) {}

  async buscar() {
    if (this.form.valid) {
      const { cedula, apellidos } = this.form.value;
      console.log(cedula, apellidos);

      this.serviceCertificado
        .getCertificadosByCedApe(cedula, apellidos)
        .subscribe((result: any) => {
          console.log(result.data[0]);

          // Almacenar los certificados en el servicio antes de navegar
          this.serviceCertificado.setCertificados(result.data);

          this.router.navigateByUrl('home/certificate');
        });
    }
  }
}
