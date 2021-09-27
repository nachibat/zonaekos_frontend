import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  private url = 'https://api.themoviedb.org/3';
  private apikey = '3f5855c96218ee937d97ac69b636dac7';

  buscarPeliculas(query: string): Observable<void> {
    return this.http.get<void>(`${this.url}/search/movie?api_key=${this.apikey}&language=es-ES&query=${query}`);
  }

}
