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
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  private certificadosKey = 'certificados';
  private certificados: any[] = [];
  private readonly CERTIFICADOS_KEY = 'certificados';
  private readonly USER_INFO_KEY = 'user_info';
  API = 'https://axiomatic-sonar-405920.rj.r.appspot.com/api/certificados';

  constructor(private http: HttpClient, private router: Router) {
    const storedCertificados = localStorage.getItem(this.CERTIFICADOS_KEY);
    if (storedCertificados) {
      this.certificados = JSON.parse(storedCertificados);
    }
  }

  getCertificadosYCursosByCedApe(ced_par: any, ape_par: any) {
    console.log('CED_PAR y APE_PAR:', ced_par, ape_par);
    return this.http.get(`${this.API}/${ced_par}/${ape_par}`).pipe(
      tap((result: any) => {
        console.log('resultado en el get', result.data['certificados']);
        // No asignar a la variable certificados, solo realizar acciones si es necesario.
      })
    );
  }

  getCertificadosByCurso(ced_par: any, ape_par: any, cod_cur: any) {
    console.log('CED_PAR y APE_PAR:', ced_par, ape_par);
    return this.http.get(`${this.API}/${ced_par}/${ape_par}/${cod_cur}`).pipe(
      tap((result: any) => {
        console.log('resultado en el get', result.data['certificados']);
        this.certificados = result.data['certificados'];
        localStorage.setItem(
          this.CERTIFICADOS_KEY,
          JSON.stringify(this.certificados)
        );
      })
    );
  }
  getCertificados(): any[] {
    const certificadosString = localStorage.getItem(this.certificadosKey);
    if (certificadosString) {
      return JSON.parse(certificadosString);
    } else {
      return [];
    }
  }

  // Nuevo método para establecer los certificados
  setCertificados(certificados: any[]) {
    const certificadosString = JSON.stringify(certificados);
    localStorage.setItem(this.certificadosKey, certificadosString);
  }
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  // Nuevo método para almacenar la cédula y apellido en el almacenamiento local
  storeUserInfo(cedula: string, apellido: string): void {
    const userInfo = { cedula, apellido };
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
  }

  // Nuevo método para obtener la información del usuario almacenada en el localStorage
  getStoredUserInfo(): { cedula: string; apellido: string } | null {
    const storedUserInfo = localStorage.getItem(this.USER_INFO_KEY);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
}
