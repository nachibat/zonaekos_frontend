import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculasResponse, Pelicula, PeliculaOk } from '../../interfaces/peliculas-response';
import { NgForm } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { ReportesService } from '../../services/reportes.service';
import { Reporte } from '../../interfaces/reportes-response';

@Component({
  selector: 'app-admin-peliculas',
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.css']
})
export class AdminPeliculasComponent implements OnInit {

  @ViewChild('modalAdd', { read: TemplateRef }) modalAdd: TemplateRef<any>;
  @ViewChild('modalBorrar', { read: TemplateRef }) modalBorrar: TemplateRef<any>;
  @Output() listadoEvent = new EventEmitter<string>();

  public peliculas: Pelicula[] = [];
  public reportes: Reporte[] = [];
  public switchReport = false;
  public modificarBan = false;
  public pelicula = {
    title: null,
    original_title: null,
    overview: null,
    categoria: null,
    publish_date: null,
    release_date: null,
    vote_average: null,
    vote_count: null,
    genre: null,
    backdrop_path: null,
    poster_path: null,
    stream_link: null,
    stream_link_en: null
  };
  public peliculasTmdb = [];

  public titulo = 'Listado';
  public mensajeConfirmacion = '';
  public search = '';
  public tmdbSearch = '';

  private idPelicula: string;

  constructor(private modal: NgbModal,
              private peliculaService: PeliculasService,
              private tmdbService: TmdbService,
              private reporteService: ReportesService) { }

  ngOnInit(): void {
    this.recargarPeliculas();
    this.recargarReporte();
  }

  cambiarListado(listado: string): void {
    this.listadoEvent.emit(listado);
  }

  cambioReporte(): void {
    this.switchReport = !this.switchReport;
    if (!this.switchReport) {
      this.titulo = 'Listado';
    } else {
      this.titulo = 'Reporte';
    }
  }

  openModal(modal, size): void {
    this.modal.open(modal, {
      animation: true,
      backdrop: 'static',
      centered: true,
      size
    });
  }

  recargar(): void {
    if (this.switchReport) {
      this.recargarReporte();
    } else {
      this.recargarPeliculas();
    }
  }

  recargarPeliculas(): void {
    this.peliculaService.getPeliculas(0, 10, '-publish_date').subscribe((peliResp: PeliculasResponse) => {
      this.peliculas = peliResp.peliculas;
    });
  }

  recargarReporte(): void {
    this.reporteService.getReportePeliculas(0, 10).subscribe(resp => {
      this.reportes = resp.reportes;
    });
  }

  editarPelicula(pelicula: Pelicula): void {
    this.modificarBan = true;
    this.pelicula = {
      title: pelicula.title,
      original_title: pelicula.original_title,
      overview: pelicula.overview,
      categoria: pelicula.categoria,
      publish_date: pelicula.publish_date,
      release_date: pelicula.release_date,
      vote_average: pelicula.vote_average,
      vote_count: pelicula.vote_count,
      genre: pelicula.genre,
      backdrop_path: pelicula.backdrop_path,
      poster_path: pelicula.poster_path,
      stream_link: pelicula.stream_link,
      stream_link_en: pelicula.stream_link_en
    };
    this.idPelicula = pelicula._id;
    this.openModal(this.modalAdd, 'lg');
  }

  confirmaBorrar(id: string, titulo: string): void {
    this.mensajeConfirmacion = `Esta seguro que desea borrar la película \"${titulo}\"?`;
    this.idPelicula = id;
    this.openModal(this.modalBorrar, 'sm');
  }

  agregarPelicula(form: NgForm): void {
    if (form.invalid) { return; }
    if (this.modificarBan) {
      // TODO modificar
      this.peliculaService.modificarPelicula(this.idPelicula, this.pelicula).subscribe(() => {
        this.modal.dismissAll();
        this.recargarPeliculas();
      });
    } else {
      this.peliculaService.altaPelicula(this.pelicula).subscribe((resp: PeliculaOk) => {
        this.modal.dismissAll();
        this.recargarPeliculas();
      });
    }
  }

  buscar(): void {
    if (this.search.trim().length === 0) { return; }
    this.peliculaService.buscarPelicula(0, 20, '', this.search.trim()).subscribe(resp => {
      this.peliculas = resp.peliculas;
    });
    this.modal.dismissAll();
  }

  buscarTmdb(): void {
    if (this.tmdbSearch.trim().length === 0) { return; }
    this.tmdbService.buscarPeliculas(this.tmdbSearch.trim()).subscribe((resp: any) => {
      this.peliculasTmdb = resp.results;
    });
  }

  cargarPelicula(pelicula): void {
    this.pelicula = {
      title: pelicula.title,
      original_title: pelicula.original_title,
      overview: pelicula.overview,
      categoria: pelicula.categoria,
      publish_date: null,
      release_date: pelicula.release_date,
      vote_average: pelicula.vote_average,
      vote_count: pelicula.vote_count,
      genre: null,
      backdrop_path: pelicula.backdrop_path,
      poster_path: pelicula.poster_path,
      stream_link: null,
      stream_link_en: null
    };
    this.modal.dismissAll();
    this.openModal(this.modalAdd, 'lg');
  }

  borrarPelicula(): void {
    this.peliculaService.borrarPelicula(this.idPelicula).subscribe(() => {
      this.modal.dismissAll();
      this.recargarPeliculas();
    });
  }

  restaurarPelicula(idReporte: string): void {
    this.reporteService.modificarReporte(idReporte).subscribe(
      resp => console.log(resp),
      err => console.log(err),
      () => this.recargarReporte()
    );
  }

}
