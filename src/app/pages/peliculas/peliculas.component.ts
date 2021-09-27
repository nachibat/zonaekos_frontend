import { Component, HostListener, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public peliculas: Pelicula[] = [];

  private desde: number;
  private limite: number;
  private totalPeliculas: number;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max) {
      if (this.peliculasService.cargando) { return; }
      if (this.peliculas.length === this.totalPeliculas) { return; }
      this.desde = this.desde + this.limite;
      this.cargarPeliculas();
    }
  }

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.desde = 0;
    this.limite = 12;
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculasService.getPeliculas(this.desde, this.limite, '-release_date').subscribe(resp => {
      this.peliculas.push(...resp.peliculas);
      this.totalPeliculas = resp.total_registros;
      this.peliculasService.cargando = false;
    }, err => {
      console.error(err);
      this.peliculasService.cargando = false;
    });
  }

}
