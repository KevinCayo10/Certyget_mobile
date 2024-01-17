// Importa los módulos necesarios de Angular
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { Route, Router } from '@angular/router';
// Decorador que define el componente
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Inyección del servicio Router
  router = inject(Router);
  // Creación del formulario con controles para apellidos y cédula
  form = new FormGroup({
    apellidos: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    cedula: new FormControl('', [Validators.required]),
  });
  // Constructor que inyecta el servicio ServiceService
  constructor(private serviceCertificado: ServiceService) {}
  // Método para realizar la búsqueda de certificados
  async buscar() {
    if (this.form.valid) {
      const cedula = this.form.get('cedula')?.value as string;
      const apellidos = this.form.get('apellidos')?.value as string;
      // Verifica si cédula y apellidos tienen valores
      if (cedula && apellidos) {
        console.log(cedula, apellidos);
        // Llama al servicio para obtener certificados y cursos
        this.serviceCertificado
          .getCertificadosYCursosByCedApe(cedula, apellidos)
          .subscribe(
            (result: any) => {
              console.log('Esto esta en el form: ' + cedula);
              console.log('condicion', result.data);
              // Verifica si se encontraron certificados
              if (
                result.data &&
                result.data.certificados &&
                result.data.certificados.length > 0
              ) {
                // Verifica si la cédula coincide con la del primer certificado
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
                  // Muestra un mensaje si no se encontraron certificados
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
