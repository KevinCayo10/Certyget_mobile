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
      const cedula = this.form.get('cedula')?.value as string;
      const apellidos = this.form.get('apellidos')?.value as string;

      if (cedula && apellidos) {
        console.log(cedula, apellidos);

        this.serviceCertificado
          .getCertificadosYCursosByCedApe(cedula, apellidos)
          .subscribe(
            (result: any) => {
              console.log('Esto esta en el form: ' + cedula);
              console.log('condicion', result.data);

              if (
                result.data &&
                result.data.certificados &&
                result.data.certificados.length > 0
              ) {
                if (cedula == result.data.certificados[0].ced_par_cer) {
                  console.log('paso la prueba');

                  // Almacenar la información del usuario en el servicio antes de navegar
                  this.serviceCertificado.setCertificados(
                    result.data.certificados
                  );

                  // Almacenar cédula y apellido en el localStorage
                  this.serviceCertificado.storeUserInfo(cedula, apellidos);

                  this.router.navigateByUrl('home/certificate');
                } else {
                  this.serviceCertificado.presentToast({
                    message: 'No existe un participante con esas credenciales',
                    duration: 2000,
                    color: 'danger',
                    position: 'bottom',
                    icon: 'alert-circle-outline',
                  });
                }
              } else {
                this.serviceCertificado.presentToast({
                  message: 'No se encontraron certificados',
                  duration: 2000,
                  color: 'danger',
                  position: 'bottom',
                  icon: 'alert-circle-outline',
                });
              }
            },
            (error) => {
              console.log('Error al buscar certificados', error);
              // Manejo de errores: Puedes agregar lógica adicional según tus necesidades.
            }
          );
      }
    }
  }
}
