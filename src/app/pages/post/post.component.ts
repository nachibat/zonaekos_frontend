import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from 'src/app/interfaces/peliculas-response';
import { PeliculasService } from '../../services/peliculas.service';
import { Location } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportesService } from '../../services/reportes.service';
import { ShareService } from '../../services/share.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('info', { read: TemplateRef }) info: TemplateRef<any>;
  @ViewChild('confirm', { read: TemplateRef }) confirm: TemplateRef<any>;

  public pelicula: Pelicula;
  public genre: string[];
  public infoMessage = 'Falla';
  public reportado = false;

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              public usuarioService: UsuariosService,
              private modal: NgbModal,
              private reporteService: ReportesService,
              private shareService: ShareService,
              @Inject(DOCUMENT) private dom) { }

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.params.id;
    const { uri } = this.activatedRoute.snapshot.params;
    this.updateCanonicalUrl(`https://zonaekos.com/post/${uri}/`);
    this.peliculasService.getPeliculaByUri(uri).subscribe(resp => {
      this.pelicula = resp.peliculaDB;
      this.genre = this.pelicula.genre.split('-');
      this.shareService.setFacebookTags(`https://zonaekos.com/post/${uri}/`, this.pelicula.title, this.pelicula.overview, this.pelicula.poster_path);
      this.reporteService.getReporte(this.pelicula._id).subscribe(resp => {
        if (resp.reportes.length > 0) { this.reportado = true; }
      });
    });
  }

  onVerOnline(link: string): void {
    window.open(link, '_blank');
  }

  onRegresar(): void {
    this.location.back();
  }

  modalInfo(info): void {
    this.modal.open(info, {
      animation: true,
      backdrop: 'static',
      size: 'sm',
      centered: true
    });
  }

  modalConfirm(confirm): void {
    this.modal.open(confirm, {
      animation: true,
      backdrop: true,
      size: 'sm',
      centered: true
    });
  }

  consultaReporteLinks(): void {
    if (!this.usuarioService.usuario) {
      this.infoMessage = 'Para poder reporta links caidos debe estar logueado!';
      return this.modalInfo(this.info);
    }
    if (this.reportado) {
      this.infoMessage = 'Los links ya fueron reportados. Estamos trabajando para tener los links en condiciones.';
      return this.modalInfo(this.info);
    }
    this.modalConfirm(this.confirm);
  }

  reportarLinks(idPelicula: string): void {
    this.reporteService.reportarLink(idPelicula).subscribe(resp => {
      this.modal.dismissAll();
      this.reportado = true;
      this.infoMessage = 'Links reportados correctamente. Los links estarán disponibles a la brevedad.';
      this.modalInfo(this.info);
    }, err => {
      console.log(err);
      this.infoMessage = 'Ocurrio un error al reportar. Intentelo mas tarde.';
      this.modalInfo(this.info);
    });
  }

  updateCanonicalUrl(url: string): void {
    const head = this.dom.getElementsByTagName('head'[0]);
    let element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element === null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }

}
