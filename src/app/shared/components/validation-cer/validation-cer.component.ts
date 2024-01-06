import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-validation-cer',
  templateUrl: './validation-cer.component.html',
  styleUrls: ['./validation-cer.component.scss'],
})
export class ValidationCerComponent implements OnInit {
  @Input() codigoVerificacion?: string;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  goToMain() {
    this.modalController.dismiss();
  }
  closeModal() {
    // Cierra el modal al hacer clic en el botón de cerrar
    this.modalController.dismiss();
  }
}
