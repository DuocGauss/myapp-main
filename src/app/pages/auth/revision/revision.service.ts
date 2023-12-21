// revision.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  private apiUrl = 'http://127.0.0.1:8000/api/';  // Ajusta la URL según tu API

  constructor(private http: HttpClient) {}

  realizarObservacionDiaria(revisionData: any): Observable<any> {
    const url = `${this.apiUrl}revisiondiaria/`;  // Ajusta la URL según tu API

    // Realiza una solicitud POST para crear una nueva revisión
    return this.http.post<any>(url, revisionData);
  }
}
