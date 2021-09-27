import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AdminPeliculasComponent } from './admin-peliculas/admin-peliculas.component';
import { AdminSeriesComponent } from './admin-series/admin-series.component';
import { SeriesPosterGridComponent } from './series-poster-grid/series-poster-grid.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    FooterComponent,
    AdminPeliculasComponent,
    AdminSeriesComponent,
    SeriesPosterGridComponent,
    BannerComponent
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    FooterComponent,
    AdminPeliculasComponent,
    AdminSeriesComponent,
    SeriesPosterGridComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentsModule { }
