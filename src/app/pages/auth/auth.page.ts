// auth.page.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Puedes eliminar esta parte si ya no necesitas obtener todos los usuarios aquí
    // Deberías obtener el token después del inicio de sesión y almacenarlo de manera segura
  }

  login() {
    // Realiza la autenticación utilizando el servicio de autenticación
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Si la autenticación es exitosa, response contendrá el token
        const token = response.access;
        
        // Almacena el token de manera segura (puedes usar localStorage, sessionStorage o alguna solución segura)
        localStorage.setItem('token', token);
        
        // Puedes navegar a otra página o realizar acciones adicionales después del inicio de sesión exitoso
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/auth/sign-up']);
      },
      (error) => {
        // Manejar el caso en que la autenticación no sea exitosa
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
