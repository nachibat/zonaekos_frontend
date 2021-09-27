import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportesResponse, ReporteResponse, ListReporteResponse } from '../interfaces/reportes-response';
import { environment } from '../../environments/environment';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private url = environment.URL;

  constructor(private http: HttpClient,
              private usuarioService: UsuariosService) { }

  getReporte(id: string): Observable<ReportesResponse> {
    return this.http.get<ReportesResponse>(`${this.url}/reportes/${id}`);
  }

  reportarLink(idPelicula: string): Observable<ReporteResponse> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    const body = { pelicula: idPelicula };
    return this.http.post<ReporteResponse>(`${this.url}/reportes`, body, { headers });
  }

  getReportePeliculas(desde: number = 0, limite: number = 5): Observable<ListReporteResponse> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.get<ListReporteResponse>(`${this.url}/reportes?desde=${desde}&limite=${limite}`, { headers });
  }

  modificarReporte(idReporte: string): Observable<any> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.url}/reportes/${idReporte}`, {}, { headers });
  }

}
