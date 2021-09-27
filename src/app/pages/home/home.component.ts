import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../interfaces/peliculas-response';
import { Serie } from '../../interfaces/series-response';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cartelera: Pelicula[] = [];
  public movies: Pelicula[] = [];
  public series: Serie[] = [];

  constructor(public peliculasService: PeliculasService,
              private serieService: SeriesService) { }

  ngOnInit(): void {
    this.cargarCartelera();
    this.cargarPeliculas();
    this.cargarSeries();
  }

  cargarCartelera(): void {
    this.peliculasService.getPeliculas(0, 5, '-publish_date').subscribe(resp => {
      this.cartelera = resp.peliculas;
      this.peliculasService.cargando = false;
    });
  }

  cargarPeliculas(): void {
    this.peliculasService.getPeliculas(0, 8, '-release_date').subscribe(resp => {
      this.movies = resp.peliculas;
      this.peliculasService.cargando = false;
    }, err => {
      console.error(err);
      this.peliculasService.cargando = false;
    });
  }

  cargarSeries(): void {
    this.serieService.listadoSeries(0, 8, 'title').subscribe(resp => {
      this.series = resp.series;
      this.serieService.cargando = false;
    }, err => {
      console.error(err);
      this.peliculasService.cargando = false;
    });
  }

}
