import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { SeriesComponent } from './pages/series/series.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PoliticasPrivacidadComponent } from './pages/politicas-privacidad/politicas-privacidad.component';
import { AdministrarComponent } from './pages/administrar/administrar.component';
import { PostSerieComponent } from './pages/post-serie/post-serie.component';
import { StreamComponent } from './pages/stream/stream.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'peliculas',
    component: PeliculasComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  },
  {
    path: 'anime',
    component: AnimeComponent
  },
  {
    path: 'post/:uri',
    component: PostComponent
  },
  {
    path: 'post-serie/:uri',
    component: PostSerieComponent
  },
  {
    path: 'buscar/:termino',
    component: BuscarComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [UsuarioGuard]
  },
  {
    path: 'administrar',
    component: AdministrarComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'politicas',
    component: PoliticasPrivacidadComponent
  },
  {
    path: 'stream',
    component: StreamComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
