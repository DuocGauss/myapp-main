// sign-up.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAutosBomberos(): Observable<any[]> {
    const userRole = this.authService.getUserRole();
    const userCompany = this.authService.getUserCompany();
    
    let autosUrl = `${this.apiUrl}autobombero/`;

    if (userRole === 'capitan' && userCompany) {
      return this.http.get<any[]>(autosUrl).pipe(
        map((autos) => {
          // Filtrar los vehículos por la compañía del capitán actual
          return autos.filter(auto => auto.compania.nombre_compania === userCompany);
        })
      );
    }

    // Si el usuario no es un capitán o no tiene una compañía asignada, mostrar todos los vehículos
    return this.http.get<any[]>(autosUrl);
  }
  
  // Otros métodos
}
