import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  API = 'https://axiomatic-sonar-405920.rj.r.appspot.com/api/certificados';
  constructor(private http: HttpClient) {}
  getCertificadosByCedApe(ced_par: any, ape_par: any) {
    console.log('CED_PAR y APE_PAR:', ced_par, ape_par);
    return this.http.get(`${this.API}/${ced_par}/${ape_par}`);
  }
}