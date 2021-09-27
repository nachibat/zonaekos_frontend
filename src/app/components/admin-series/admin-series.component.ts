import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Serie, CapituloReportado } from '../../interfaces/series-response';
import { SeriesService } from '../../services/series.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-series',
  templateUrl: './admin-series.component.html',
  styleUrls: ['../admin-peliculas/admin-peliculas.component.css', './admin-series.component.css']
})
export class AdminSeriesComponent implements OnInit {

  @ViewChild('btn_ok') btnOk: ElementRef;
  @ViewChild('btn_cancel') btnCancel: ElementRef;

  @Output() listadoEvent = new EventEmitter<string>();
  public series: Serie[] = [];
  public serieModificar: Serie;
  public modalListado = false;
  public modalFormSerie = false;
  public modalFormCapitulo = false;
  public modalInfo = false;
  public temporadas: any[] = [];
  public tituloSerie = '';
  public cuerpoModalInfo = '';
  public tituloForm = '';
  public tituloFormCapitulo = '';
  public reporteCapitulos = false;
  public listadoReporte: CapituloReportado[] = [];
  public modalConfirm = {
    estado: false,
    body: '',
    tipo: '',
    data: null
  };

  private idSerie = '';
  private idCapitulo = '';

  public serie = {
    title: null,
    original_title: null,
    overview: null,
    categoria: null,
    genre: null,
    poster_path: null,
    backdrop_path: null
  };

  public capitulo = {
    serie: null,
    season: null,
    chapter: null,
    title: null,
    overview: null,
    stream_link_ori: null,
    stream_link_lat: null,
    download_link: null,
    release_date: null
  };

  constructor(private serieService: SeriesService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cargarSeries();
  }

  cambiarListado(listado: string): void {
    this.listadoEvent.emit(listado);
  }

  cargarSeries(): void {
    this.serieService.listadoSeries(0, 8, '-modified').subscribe(resp => {
      this.series = resp.series;
    });
  }

  cargarReporte(): void {
    this.serieService.reporteCapitulos(0, 20).subscribe(resp => {
      this.listadoReporte = resp.capituloReportado;
    });
  }

  async cargarCapitulos(id: string): Promise<any> {
    this.temporadas.length = 0;
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

  showModal(id: string, titulo: string): void {
    this.modalListado = true;
    this.cargarCapitulos(id);
    this.tituloSerie = titulo;
  }

  showModalForm(tipo: string, serie?: Serie): void {
    if (tipo === 'modificar') {
      this.idSerie = serie._id;
      this.serie = {
        title: serie.title,
        original_title: serie.original_title,
        overview: serie.overview,
        categoria: serie.categoria,
        genre: serie.genre,
        poster_path: serie.poster_path,
        backdrop_path: serie.backdrop_path
      };
    } else {
      this.serie = {
        title: null,
        original_title: null,
        overview: null,
        categoria: null,
        genre: null,
        poster_path: null,
        backdrop_path: null
      };
    }
    this.tituloForm = tipo;
    this.modalFormSerie = true;
  }

  showModalCapitulo(objeto: any, tipo: string): void {
    this.tituloFormCapitulo = tipo;
    this.modalFormCapitulo = true;
    if (tipo === 'agregar') {
      this.serieModificar = objeto;
    } else {
      this.idCapitulo = objeto._id;
      this.capitulo = {
        serie: objeto.serie._id,
        season: objeto.season,
        chapter: objeto.chapter,
        title: objeto.title,
        overview: objeto.overview,
        stream_link_ori: objeto.stream_link_ori,
        stream_link_lat: objeto.stream_link_lat,
        download_link: objeto.download_link,
        release_date: this.datePipe.transform(this.convertirFecha(objeto.release_date), 'yyyy-MM-dd')
      };
    }
  }

  convertirFecha(fecha: any): string {
    const dia = (new Date(fecha)).getUTCDate().toString();
    const mes = (new Date(fecha)).getUTCMonth() + 1;
    const month = mes.toString();
    const year = (new Date(fecha)).getUTCFullYear().toString();
    return (`${year}-${month}-${dia}`);
  }

  closeModal(): void {
    this.modalListado = false;
    this.modalFormSerie = false;
    this.modalFormCapitulo = false;
    this.modalInfo = false;
  }

  agregarModificarSerie(form: NgForm, tipo: string): void {
    if (form.invalid) { return; }
    if (tipo === 'agregar') {
      this.serieService.altaSerie(this.serie).subscribe(resp => {
        this.cargarSeries();
        this.closeModal();
      });
    } else {
      this.serieService.modificarSerie(this.idSerie, this.serie).subscribe(resp => {
        this.cargarSeries();
        this.closeModal();
      });
    }
  }

  agregarModificarCapitulo(form: NgForm): void {
    if (form.invalid) { return; }
    if (this.tituloFormCapitulo === 'modificar') {
      this.showModalConfirm('modificarCapitulo', 'Está seguro que desea guadar los cambios realizados?');
    } else {
      this.capitulo.serie = this.serieModificar._id;
      this.serieService.altaCapitulo(this.capitulo).subscribe(resp => {
        this.modalInfo = true;
        this.cuerpoModalInfo = 'Se agregó el capítulo con éxito!';
        this.closeModal();
      });
    }
  }

  modificarCapitulo(): void {
    this.serieService.modificarCapitulo(this.idCapitulo, this.capitulo).subscribe(resp => {
      this.modalConfirm.estado = false;
      this.modalInfo = true;
      this.cuerpoModalInfo = 'Se modificó el capítulo con éxito!';
      this.closeModal();
    });
  }

  async consultaBajaSerie(id: string): Promise<any> {
    const resp = await this.serieService.totalCapitulos(id);
    if (resp.total > 0) {
      this.modalInfo = true;
      this.cuerpoModalInfo = 'No se puede eliminar la serie. Debe eliminar todos los capítulos antes!';
    } else {
      this.showModalConfirm('bajaSerie', 'Está seguro que desea eliminar la serie?', id);
    }
  }

  bajaSerie(id: string): void {
    this.serieService.bajaSerie(id).subscribe(
      resp => {
        this.modalConfirm.estado = false;
        this.modalInfo = true;
        this.cuerpoModalInfo = 'Se eliminó la serie con éxito!';
        this.cargarSeries();
      },
      err => {
        this.modalConfirm.estado = false;
        this.modalInfo = true;
        this.cuerpoModalInfo = 'Ocurrió un error. Ver la consola!';
        console.log(err);
      }
    );
  }

  bajaCapitulo(id: string): void {
    this.serieService.bajaCapitulo(id).subscribe(resp => {
      this.modalConfirm.estado = false;
      this.modalInfo = true;
      this.cuerpoModalInfo = 'Se eliminó el capítulo con éxito!';
    });
  }

  showModalConfirm(tipo: string, body: string, data?: any): void {
      this.modalConfirm.estado = true;
      this.modalConfirm.body = body;
      this.modalConfirm.tipo = tipo;
      this.modalConfirm.data = data;
  }

  switchReporte(): void {
    this.reporteCapitulos = !this.reporteCapitulos;
    if (this.reporteCapitulos) {
      this.cargarReporte();
    }
  }

  restaurarCapitulo(id: string): void {
    this.serieService.restaurarCapitulo(id).subscribe(resp => {
      this.modalInfo = true;
      this.cuerpoModalInfo = 'Se restauró el capitulo con exito';
      this.cargarReporte();
    });
  }

}
