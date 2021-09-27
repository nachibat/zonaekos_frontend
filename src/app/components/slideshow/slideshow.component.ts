import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas-response';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Pelicula[];

  public mySwiper: Swiper;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {

    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });

  }

  ngOnInit(): void {

  }

  onSlideNext(): void {
    this.mySwiper.slideNext();
  }

  onSlidePrev(): void {
    this.mySwiper.slidePrev();
  }

  onMovieClick(movie): void {
    this.router.navigate(['/post', movie._id]);
  }

}
