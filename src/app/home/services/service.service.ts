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
  // Inyección de controladores de Ionic
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  // Claves para el almacenamiento local
  private certificadosKey = 'certificados';
  private certificados: any[] = [];
  // Propiedades para el manejo de certificados y la URL de la API
  private readonly CERTIFICADOS_KEY = 'certificados';
  private readonly USER_INFO_KEY = 'user_info';
  API = 'https://fabled-opus-411016.rj.r.appspot.com/api/certificados';

  constructor(private http: HttpClient, private router: Router) {
    // Recuperar certificados del almacenamiento local al iniciar
    const storedCertificados = localStorage.getItem(this.CERTIFICADOS_KEY);
    if (storedCertificados) {
      this.certificados = JSON.parse(storedCertificados);
    }
  }
  // Método para obtener certificados y cursos por cédula y apellido
  getCertificadosYCursosByCedApe(ced_par: any, ape_par: any) {
    console.log('CED_PAR y APE_PAR:', ced_par, ape_par);
    return this.http.get(`${this.API}/${ced_par}/${ape_par}`).pipe(
      tap((result: any) => {
        console.log('resultado en el get', result.data['certificados']);
        // No asignar a la variable certificados, solo realizar acciones si es necesario.
      })
    );
  }
  // Método para obtener certificados por cédula, apellido y código de curso
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
  // Método para obtener certificados del almacenamiento local
  getCertificados(): any[] {
    const certificadosString = localStorage.getItem(this.certificadosKey);
    if (certificadosString) {
      return JSON.parse(certificadosString);
    } else {
      return [];
    }
  }
  // Método para establecer certificados en el almacenamiento local
  setCertificados(certificados: any[]) {
    const certificadosString = JSON.stringify(certificados);
    localStorage.setItem(this.certificadosKey, certificadosString);
  }
  // Método asíncrono para mostrar un Toast (mensaje emergente) según las opciones proporcionadas
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  // Método para almacenar la información del usuario en el almacenamiento local
  storeUserInfo(cedula: string, apellido: string): void {
    const userInfo = { cedula, apellido };
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
  }
  // Método para obtener la información del usuario almacenada en el almacenamiento local
  getStoredUserInfo(): { cedula: string; apellido: string } | null {
    const storedUserInfo = localStorage.getItem(this.USER_INFO_KEY);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
}
