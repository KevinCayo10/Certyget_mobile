import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-validation-cer',
  templateUrl: './validation-cer.component.html',
  styleUrls: ['./validation-cer.component.scss'],
})
export class ValidationCerComponent implements OnInit {
  @Input() codigoVerificacion?: string;
  @Input() evento?: string;
  @Input() fecha_evento?: string;
  @Input() duracion_evento?: string;
  @Input() descargar_certificado?: string;
  @Input() certificado_receptor?: string;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  goToMain() {
    this.modalController.dismiss();
  }
  closeModal() {
    // Cierra el modal al hacer clic en el botón de cerrar
    this.modalController.dismiss();
  }
  descargarCertificado(certificado: any) {
    // Obtener la URL de la imagen
    const imageUrl = certificado;

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
}
