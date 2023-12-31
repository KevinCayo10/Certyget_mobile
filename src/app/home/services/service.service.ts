import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private certificados: any[] = [];
  private readonly CERTIFICADOS_KEY = 'certificados';

  API = 'https://axiomatic-sonar-405920.rj.r.appspot.com/api/certificados';

  constructor(private http: HttpClient, private router: Router) {
    const storedCertificados = localStorage.getItem(this.CERTIFICADOS_KEY);
    if (storedCertificados) {
      this.certificados = JSON.parse(storedCertificados);
    }
  }

  getCertificadosByCedApe(ced_par: any, ape_par: any) {
    console.log('CED_PAR y APE_PAR:', ced_par, ape_par);
    return this.http.get(`${this.API}/${ced_par}/${ape_par}`).pipe(
      tap((result: any) => {
        this.certificados = result.data;
        localStorage.setItem(
          this.CERTIFICADOS_KEY,
          JSON.stringify(this.certificados)
        );
      })
    );
  }

  getStoredCertificados(): any[] {
    return this.certificados;
  }

  // Nuevo método para establecer los certificados
  setCertificados(certificados: any[]): void {
    this.certificados = certificados;
    localStorage.setItem(
      this.CERTIFICADOS_KEY,
      JSON.stringify(this.certificados)
    );
  }
}
