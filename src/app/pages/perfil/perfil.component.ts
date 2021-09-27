import { Component, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario, UsuarioResponse } from '../../interfaces/usuarios-response';
import { NavbarService } from '../../services/navbar.service';
import { Pelicula } from '../../interfaces/peliculas-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @ViewChild('fullname') fullnameField: ElementRef;
  private fullname: string;
  public inputName = false;
  public usuario: Usuario;
  public habilitarMenu = 'habilitar-menu';
  public display = 'd-none';
  public administrar = false;

  constructor(public usuarioService: UsuariosService,
              private navbarService: NavbarService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe((resp: UsuarioResponse) => {
      this.usuario = resp.usuario;
      this.fullname = this.usuario.fullname;
      if (this.usuario.google || this.usuario.facebook || this.usuario.twitter) {
        this.usuarioService.socialUsers = true;
      }
      if (this.usuario.role === 'ADMIN_ROLE') {
        this.administrar = true;
      }
    });
  }

  edit(): void {
    this.inputName = true;
    this.fullnameField.nativeElement.focus();
  }

  guardarNombre(id: string, nombre: string): void {
    this.usuarioService.modificarPerfil(id, nombre).subscribe((resp: UsuarioResponse) => {
      this.usuario = resp.usuario;
      this.display = 'd-block';
      this.changeNavbar();
    });
    this.inputName = false;
  }

  cancelNombre(): void {
    this.usuario.fullname = this.fullname;
    this.inputName = false;
  }

  changeNavbar(): void {
    if (this.habilitarMenu === 'habilitar-menu') {
      this.navbarService.disableNavbar('deshabilitar-menu');
    } else {
      this.navbarService.disableNavbar('habilitar-menu');
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

}
