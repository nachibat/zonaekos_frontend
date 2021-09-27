import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../interfaces/peliculas-response';
import { PeliculasService } from '../../services/peliculas.service';
import { Serie } from '../../interfaces/series-response';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public peliculas: Pelicula[];
  public series: Serie[];
  public termino: string;
  private desde: number;
  private limite: number;
  private totalPeliculas: number;

  constructor(private activatedRoute: ActivatedRoute,
              public peliculaService: PeliculasService,
              public serieService: SeriesService) { }

  ngOnInit(): void {
    this.desde = 0;
    this.limite = 12;
    this.activatedRoute.params.subscribe(params => {
      this.peliculas = [];
      this.series = [];
      this.termino = params.termino;
      this.cargarPeliculas(this.termino);
      this.cargarSeries(this.termino);
    });
  }

  cargarPeliculas(termino: string): void {
    this.peliculaService.buscarPelicula(this.desde, this.limite, '', termino).subscribe(resp => {
      this.peliculas.push(...resp.peliculas);
      this.totalPeliculas = resp.total_registros;
      this.peliculaService.cargando = false;
    });
  }

  cargarSeries(termino: string): void {
    this.serieService.buscarSerie(this.desde, this.limite, '', termino).subscribe(resp => {
      this.series = resp.series;
      this.serieService.cargando = false;
    });
  }

}
