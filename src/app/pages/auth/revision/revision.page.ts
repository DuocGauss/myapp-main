import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RevisionService } from './revision.service';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.page.html',
  styleUrls: ['./revision.page.scss'],
})
export class RevisionPage implements OnInit {
  revisionData: any = {}; // Asegúrate de inicializarlo según tu modelo

  constructor(
    private route: ActivatedRoute,
    private revisionService: RevisionService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    // Obtener los parámetros de la URL
    this.route.params.subscribe((params) => {
      const carroId = params['autoId'];
      const userId = params['userId'];
      console.log('ID del Auto de Bomberos:', carroId);
      console.log('ID del Usuario:', userId);
      // Inicializar el formulario con los datos recuperados
      this.revisionData.id_user = userId;
      this.revisionData.id_autobombero = carroId;
    });
  }

  guardarObservacionDiaria() {
    this.revisionService.realizarObservacionDiaria(this.revisionData).subscribe(
      async (response) => {
        console.log('Observación diaria guardada con éxito:', response);

        // Muestra un mensaje de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'La observación diaria se ha guardado correctamente.',
          buttons: ['OK'],
        });

        await alert.present();

        // Navega de vuelta a la página del catálogo de carros
        this.router.navigate(['/auth/sign-up']);
      },
      (error) => {
        console.error('Error al guardar observación diaria:', error);
        // Manejo de errores si es necesario
      }
    );
  }
}
