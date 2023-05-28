import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  obtenerDatos() {
    const url = `${this.baseUrl}/api/datos`;// Endpoint para obtener datos desde el backend de Spring
    return this.http.get(url);
  }

  guardarDatos(datos: any) {
    const url = `${this.baseUrl}/api/datos`;// Endpoint para enviar datos al backend de Spring
    return this.http.post(url, datos);
  }
}
