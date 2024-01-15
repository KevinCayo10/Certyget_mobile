import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ValidationCerComponent } from '../shared/components/validation-cer/validation-cer.component';
import { ValidaServiceService } from './services/valida-service.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.page.html',
  styleUrls: ['./validator.page.scss'],
})
export class ValidatorPage implements OnInit {
  evento: any;
  fecha_evento: any;
  duracion_evento: any;
  descargar_certificado: any;
  certificado_receptor: any;

  form = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
  });
  constructor(
    private modalController: ModalController,
    private validatorService: ValidaServiceService
  ) {}

  ngOnInit() {}
  validar() {
    if (this.form.valid) {
      const codigo = this.form.value.codigo;
      console.log(codigo);

      this.validatorService.getValidarCertificado(codigo).subscribe(
        (result: any) => {
          console.log(result);

          if (
            result.data &&
            result.data.length > 0 &&
            codigo === result.data[0].cod_gen_cer
          ) {
            this.evento = result.data[0].nom_cur;
            this.fecha_evento = result.data[0].fecha_inicio_cur;
            this.duracion_evento = result.data[0].dur_cur;
            this.descargar_certificado = result.data[0].url_gen_cer;
            this.certificado_receptor = result.data[0].ced_par_cer;
            this.mostrarMensajeModal(codigo);
          } else {
            console.log('No existe el código');
            this.validatorService.presentToast({
              message: 'El código de validación no existe',
              duration: 3000,
              color: 'danger',
              position: 'bottom',
              icon: 'alert-circle-outline',
            });
          }
        },
        (error) => {
          console.log('Error al validar el certificado', error);
          if (error && error.error && error.error.message) {
            this.validatorService.presentToast({
              message: error.error.message,
              duration: 3000,
              color: 'danger',
              position: 'bottom',
              icon: 'alert-circle-outline',
            });
          } else {
            this.validatorService.presentToast({
              message: 'Error al validar el certificado',
              duration: 3000,
              color: 'danger',
              position: 'bottom',
              icon: 'alert-circle-outline',
            });
          }
        }
      );
    }
  }

  async mostrarMensajeModal(codigoVerificacion: any) {
    console.log(
      'Mostrando modal con código de verificación:',
      codigoVerificacion
    );
    const modal = await this.modalController.create({
      component: ValidationCerComponent,
      componentProps: {
        codigoVerificacion: codigoVerificacion,
        evento: this.evento,
        fecha_evento: this.fecha_evento,
        duracion_evento: this.duracion_evento,
        descargar_certificado: this.descargar_certificado,
        certificado_receptor: this.certificado_receptor,
      },
  
    });

    return await modal.present();
  }
}
