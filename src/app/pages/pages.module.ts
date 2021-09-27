import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { AnimeComponent } from './anime/anime.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
// import { RatingModule } from 'ng-starrating';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { PoliticasPrivacidadComponent } from './politicas-privacidad/politicas-privacidad.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { RouterModule } from '@angular/router';
import { PostSerieComponent } from './post-serie/post-serie.component';
import { StreamComponent } from './stream/stream.component';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    BuscarComponent,
    PeliculasComponent,
    SeriesComponent,
    AnimeComponent,
    PerfilComponent,
    PoliticasPrivacidadComponent,
    AdministrarComponent,
    PostSerieComponent,
    StreamComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    // RatingModule,
    FormsModule,
    RouterModule
  ]
})
export class PagesModule { }
