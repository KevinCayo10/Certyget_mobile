import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
  providers: [DatePipe],
})
export class CertificatePage implements OnInit {
  certificados: any[] = [];

  constructor(
    private serviceCertificado: ServiceService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.certificados = this.serviceCertificado.getStoredCertificados();
    console.log('estos son los certificados: ', this.certificados);
  }

  descargarCertificado(certificado: any) {
    // Obtener la URL de la imagen
    const imageUrl = certificado.url_gen_cer;

    // Realizar la solicitud HTTP para obtener la imagen
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Crear un enlace y asignar la imagen como URL
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificado.png'; // Nombre de archivo sugerido
        document.body.appendChild(a);

        // Simular un clic en el enlace para iniciar la descarga
        a.click();

        // Limpiar después de la descarga
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error al descargar el certificado:', error);
      });
  }

  formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
  }
}
