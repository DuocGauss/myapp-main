// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private userRole: string = '';  // Agregamos una propiedad para almacenar el rol del usuario
  private userId: number | null = null;  // Agregamos una propiedad para almacenar el ID del usuario
  private userCompany: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}token/`;
  
    return this.http.post<any>(url, { username, password }).pipe(
      tap(
        (response) => {
          // Verificamos si la respuesta contiene un token y un rol
          if (response.access && response.role && response.id && response.compania) {
            // Guardamos el rol del usuario en la propiedad 'userRole'
            this.setUserRole(response.role);
            this.setUserId(response.id);
            this.setUserCompany(response.compania);
            console.log('Login Exitoso. Rol obtenido:', response.role, 'ID del usuario:', response.id, 'Compañia:', response.compania);
          } else {
            console.error('Respuesta de inicio de sesión incompleta. Token:', response.access, 'Rol:', response.role);
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
        }
      )
    );
  }
  

  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  // Otros métodos relacionados con la autenticación según tus necesidades
  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number | null {
    return this.userId;
  }

  setUserCompany(compania: string) {
    this.userCompany = compania;
  }

  getUserCompany(): string {
    return this.userCompany;
  }
}
