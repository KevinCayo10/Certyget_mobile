import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ValidaServiceService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  // URL de la API para la validación de certificados
  API =
    'https://fabled-opus-411016.rj.r.appspot.com/api/certificados/validate/code/cer';

  constructor(private http: HttpClient, private router: Router) {}
  // Método para realizar la validación de un certificado a través de la API
  getValidarCertificado(code: any) {
    return this.http.get(this.API + '/' + code);
  }
  // Método asíncrono para mostrar un Toast (mensaje emergente) según las opciones proporcionadas
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
}
