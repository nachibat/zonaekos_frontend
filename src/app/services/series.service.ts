import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListSeriesResponse, ListCapitulos, SerieResponse, SerieOK, CapituloOK, TotalResponse, ReporteCapitulos, SeriesBusqueda } from '../interfaces/series-response';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private url = environment.URL;
  public cargando = false;

  constructor(private http: HttpClient,
              private usuarioService: UsuariosService) { }

  listadoSeries(desde: number = 0, limite: number = 5, orden: string = ''): Observable<ListSeriesResponse> {
    this.cargando = true;
    return this.http.get<ListSeriesResponse>(`${this.url}/series?desde=${desde}&limite=${limite}&orden=${orden}`);
  }

  buscarSerie(desde: number = 0, limite: number = 5, orden: string = '', termino: string): Observable<SeriesBusqueda> {
    this.cargando = true;
    return this.http.get<SeriesBusqueda>(`${this.url}/series/buscar/title/${termino}?desde=${desde}&limite=${limite}&orden=${orden}`);
  }

  listadoCapitulos(id: string, season: number = 1): Promise<ListCapitulos> {
    const promise = this.http.get<ListCapitulos>(`${this.url}/capitulos/listado/${id}?season=${season}`).toPromise();
    return promise;
  }

  getSerie(id: string): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(`${this.url}/series/${id}`);
  }

  altaSerie(serie: any): Observable<SerieOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.post<SerieOK>(`${this.url}/series`, serie, { headers });
  }

  bajaSerie(id: string): Observable<SerieOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.delete<SerieOK>(`${this.url}/series/${id}`, { headers });
  }

  modificarSerie(id: string, body: any): Observable<SerieOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.put<SerieOK>(`${this.url}/series/${id}`, body, { headers });
  }

  altaCapitulo(capitulo: any): Observable<CapituloOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.post<CapituloOK>(`${this.url}/capitulos`, capitulo, { headers });
  }

  bajaCapitulo(id: string): Observable<CapituloOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.delete<CapituloOK>(`${this.url}/capitulos/${id}`, { headers });
  }

  modificarCapitulo(id: string, body: any): Observable<CapituloOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.put<CapituloOK>(`${this.url}/capitulos/${id}`, body, { headers });
  }

  reportarCapitulo(id: string): Observable<CapituloOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    const body = { algo: 'algo' };
    return this.http.put<CapituloOK>(`${this.url}/capitulo/reporte/${id}`, body, { headers });
  }

  totalCapitulos(idSerie: string): Promise<TotalResponse> {
    const promise = this.http.get<TotalResponse>(`${this.url}/capitulos/total/${idSerie}`).toPromise();
    return promise;
  }

  reporteCapitulos(desde: number = 0, limite: number = 2): Observable<ReporteCapitulos> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.get<ReporteCapitulos>(`${this.url}/capitulo/reporte?desde=${desde}&limite=${limite}`, { headers });
  }

  restaurarCapitulo(id: string): Observable<CapituloOK> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    const body = { algo: 'algo' };
    return this.http.put<CapituloOK>(`${this.url}/capitulo/restaurar/${id}`, body, { headers });
  }

}
