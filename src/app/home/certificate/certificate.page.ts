import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
  providers: [DatePipe],
})
export class CertificatePage implements OnInit {
  cursos: any[] = [];
  cursoSeleccionado: string = ''; // Curso seleccionado por el usuario
  certificados: any[] = [];
  service = inject(ServiceService);
  loading: boolean = false;
  constructor(
    private serviceCertificado: ServiceService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    
    this.obtenerCursos();
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
  doRefresh(event: any) {
    setTimeout(() => {
      /* this.getProducts(); */
      this.obtenerCertificados();
      event.target.complete();
    }, 1000);
  }
  /* obtenerCertificados() {
    this.loading = true;

    // Llama al servicio para obtener los certificados desde la API
    this.serviceCertificado
      .getCertificadosYCursosByCedApe(
        this.certificados[0].ced_par,
        this.certificados[0].ape_pat_par
      )
      .subscribe(
        (result: any) => {
          // Actualiza la lista de certificados
          this.certificados = result.data;
          console.log('Estoy volviendo a cargar el servicio: ' + result.data);
        },
        (error) => {
          console.error('Error al obtener los certificados:', error);
        },
        () => {
          // Finaliza el indicador de carga
          this.loading = false;
        }
      );
  } */
  obtenerCertificados() {
    this.loading = true;

    // Asegúrate de que hay un curso seleccionado antes de hacer la solicitud
    if (this.cursoSeleccionado) {
      // Llama al servicio para obtener los certificados del curso seleccionado
      this.serviceCertificado
        .getCertificadosByCurso(
          this.serviceCertificado.getStoredUserInfo()?.cedula,
          this.serviceCertificado.getStoredUserInfo()?.apellido,
          this.cursoSeleccionado
        )
        .subscribe(
          (result: any) => {
            // Actualiza la lista de certificados
            this.certificados = result.data;
            console.log('Estoy volviendo a cargar el servicio: ' + result.data);
          },
          (error) => {
            console.error('Error al obtener los certificados:', error);
          },
          () => {
            // Finaliza el indicador de carga
            this.loading = false;
          }
        );
    } else {
      // No hay curso seleccionado, puedes manejarlo de acuerdo a tus necesidades
      this.loading = false;
      console.warn('No hay curso seleccionado');
    }
  }
  obtenerCursos() {
    this.serviceCertificado
      .getCertificadosYCursosByCedApe(
        this.serviceCertificado.getStoredUserInfo()?.cedula,
        this.serviceCertificado.getStoredUserInfo()?.apellido
      )
      .subscribe({
        next: (result: any) => {
          this.cursos = result.data?.cursos || [];
          console.log('cursos en el obtener cursos', this.cursos);
        },
        error: (error) => {
          console.error('Error al obtener los cursos:', error);
        },
      });
  }
}
