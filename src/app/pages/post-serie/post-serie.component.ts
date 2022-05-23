import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { Serie, Capitulo } from '../../interfaces/series-response';
import { Location } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-post-serie',
  templateUrl: './post-serie.component.html',
  styleUrls: ['./post-serie.component.css']
})
export class PostSerieComponent implements OnInit {

  public serie: Serie;
  public genre: string[];
  public temporadas: any[] = [];
  public modal = false;
  public modalInfo = false;
  public modalAnswer = false;
  public modalInfoContent = '';
  public capitulo: Capitulo;
  public noOverview = 'no-overview';
  public btnOri = true;
  public btnLat = false;
  public dropdownValue = 0;

  private idCapitulo = '';

  constructor(private activatedRoute: ActivatedRoute,
              private serieService: SeriesService,
              private location: Location,
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    const uri = this.activatedRoute.snapshot.params.uri;    
    this.cargarSerie(uri);
  }

  async cargarCapitulos(id: string): Promise<any> {
    let season = 1;
    let totales = 1;
    while (totales > 0) {
      const resp = await this.serieService.listadoCapitulos(id, season);
      if (resp.total === 0) { break; }
      this.temporadas.push(resp.capitulos);
      totales = resp.total;
      season++;
    }
  }

  cargarSerie(uri: string): void {
    this.serieService.getSerieByUri(uri).subscribe(resp => {
      this.serie = resp.serieEncontrada;
      this.genre = this.serie.genre.split('-');
      this.cargarCapitulos(this.serie._id);
    });
  }

  showModal(capitulo: Capitulo): void {
    this.modal = true;
    this.capitulo = capitulo;
    if (this.capitulo.overview) {
      this.noOverview = 'overview';
    } else {
      this.noOverview = 'no-overview';
    }
    if (this.capitulo.stream_link_ori) {
      this.btnOri = false;
    } else {
      this.btnOri = true;
    }
    if (this.capitulo.stream_link_lat) {
      this.btnLat = false;
    } else {
      this.btnLat = true;
    }
  }

  closeModal(): void {
    this.modal = false;
  }

  showModalInfo(id: string, report: boolean): void {
    this.usuarioService.obtenerToken();
    if (this.usuarioService.token) {
      if (report) {
        this.modalInfoContent = 'El enlace ya fue reportado. Estamos trabajando para restaurar el enlace lo antes posible!';
        this.modalInfo = true;
      } else {
        this.modalAnswer = true;
        this.idCapitulo = id;
      }
    } else {
      this.modalInfoContent = 'Para poder reportar un link caido debe haber iniciado sesión';
      this.modalInfo = true;
    }
  }

  closeModalInfo(): void {
    this.modalInfo = false;
  }

  closeModalAnswer(): void {
    this.modalAnswer = false;
  }

  verOnline(link: string): void {
    window.open(link, '_blank');
  }

  onRegresar(): void {
    this.location.back();
  }

  reportarEnlace(): void {
    this.modalAnswer = false;
    this.serieService.reportarCapitulo(this.idCapitulo).subscribe(
      resp => {
        this.modalInfoContent = 'Se reportó el enlace con exito. Estaremos restaurando los enlaces lo antes posible!';
        this.modalInfo = true;
      },
      err => {
        this.modalInfoContent = 'Ocurrio un error. No se pudo reportar el enlace!';
        this.modalInfo = true;
      }
    );
  }

  selectDropdown(season: number) {
    this.dropdownValue = season;
  }

}
