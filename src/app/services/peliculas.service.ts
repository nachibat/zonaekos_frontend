import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeliculasResponse, PeliculaOk, Pelicula } from '../interfaces/peliculas-response';
import { environment } from '../../environments/environment';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  url = environment.URL;
  public cargando = false;

  constructor(private http: HttpClient,
              private usuarioService: UsuariosService) { }

  getPeliculas(desde: number = 0, limite: number = 5, orden: string = ''): Observable<PeliculasResponse> {
    this.cargando = true;
    return this.http.get<PeliculasResponse>(`${this.url}/peliculas?desde=${desde}&limite=${limite}&orden=${orden}`);
  }

  buscarPelicula(desde: number = 0, limite: number = 5, orden: string = '', termino: string): Observable<PeliculasResponse> {
    this.cargando = true;
    return this.http.get<PeliculasResponse>(`${this.url}/peliculas/buscar/title/${termino}?desde=${desde}&limite=${limite}&orden=${orden}`);
  }

  getPelicula(id: string): Observable<PeliculaOk> {
    return this.http.get<PeliculaOk>(`${this.url}/pelicula/${id}`);
  }

  getPeliculaByUri(uri: string): Observable<PeliculaOk> {
    return this.http.get<PeliculaOk>(`${this.url}/pelicula/buscar/${uri}`);
  }

  altaPelicula(pelicula: any): Observable<PeliculaOk> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.post<PeliculaOk>(`${this.url}/peliculas`, pelicula, { headers });
  }

  modificarPelicula(id: string, pelicula: any): Observable<PeliculaOk> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.put<PeliculaOk>(`${this.url}/pelicula/${id}`, pelicula, { headers });
  }

  borrarPelicula(id: string): Observable<PeliculaOk> {
    const token = this.usuarioService.obtenerToken();
    const headers = new HttpHeaders({ token });
    return this.http.delete<PeliculaOk>(`${this.url}/pelicula/${id}`, { headers });
  }

}
