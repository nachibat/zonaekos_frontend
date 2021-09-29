import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../../interfaces/peliculas-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Pelicula[] = [];

  constructor(private router: Router,
              public peliculaService: PeliculasService) { }

  ngOnInit(): void {
  }

  onMovieClick(movie: Pelicula): void {
    this.router.navigate(['/post', movie.uri]);
  }

}
