// sign-up.page.ts
import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  autosBomberos: any[] = [];
  isMechanic: boolean = false;
  isCaptain: boolean = false;

  constructor(private signUpService: SignUpService, private authService: AuthService, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.signUpService.getAutosBomberos().subscribe(
      (autos) => {
        this.autosBomberos = autos; 
        // Llama a isMechanic aquí para actualizar el valor cuando los autos se cargan completamente
        this.updateMechanicStatus();
        this.updateCaptainStatus();
      },
      (error) => {
        console.error('Error obteniendo autos de bomberos:', error);
      }
    );
  }

  realizarMantenimiento(auto: any) {
    // Lógica para realizar mantenimiento
    console.log('Realizando mantenimiento para el auto:', auto);
  }

  updateMechanicStatus() {
    // Utiliza el valor actualizado del rol para determinar si el usuario es mecánico
    this.isMechanic = this.authService.getUserRole() === 'mecanico';
    console.log('Is Mechanic:', this.isMechanic);
  }

  updateCaptainStatus() {
    // Utiliza el valor actualizado del rol para determinar si el usuario es mecánico
    this.isCaptain = this.authService.getUserRole() === 'capitan';
    console.log('Is Captain:', this.isCaptain);
  }

  realizarObservacionDiaria(auto: any) {
    // Lógica para realizar observación diaria
    console.log('Realizando observación diaria', auto);
    const userId = this.authService.getUserId();
    const carroId = auto.id; // Asegúrate de tener el campo correcto
    console.log('ID del Auto de Bomberos:', carroId);
    this.router.navigate(['/auth/revision',  {autoId: carroId, userId: userId}]);
  }

  // Función para mostrar la alerta de confirmación
async mostrarAlertaCerrarSesion() {
  const alert = await this.alertController.create({
    header: 'Cerrar Sesión',
    message: '¿Estás seguro de que quieres cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          // El usuario hizo clic en "Cancelar"
          console.log('Cancelar');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          // El usuario hizo clic en "Aceptar"
          console.log('Aceptar');
          // Agrega aquí la lógica para cerrar sesión
          this.router.navigate(['/auth']);
        }
      }
    ]
  });

  await alert.present();
}

// ...

// Llama a esta función cuando el usuario hace clic en el botón de cerrar sesión
async cerrarSesion() {
  await this.mostrarAlertaCerrarSesion();
}
  
}
