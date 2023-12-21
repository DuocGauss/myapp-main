import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async submit() {
    if (this.form.valid) {
      const alert = await this.alertController.create({
        header: 'Recuperar contraseña',
        message: 'Se ha enviado un correo de recuperación a ' + this.form.value.email,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Redirige a la página de inicio de sesión
              this.router.navigate(['/auth']); // Ajusta la ruta según tu configuración
            },
          },
        ],
      });

      await alert.present();
    }
  }

  ngOnInit() {}
}
