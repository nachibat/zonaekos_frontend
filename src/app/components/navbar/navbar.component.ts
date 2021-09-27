import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { PerfilComponent } from '../../pages/perfil/perfil.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('error', { read: TemplateRef }) error: TemplateRef<any>;

  loginUser = {
    email: '',
    password: ''
  };

  googleUser: SocialUser = null;
  facebookUser: SocialUser = null;

  habilitarMenu = 'habilitar-menu';

  btnDisabled = false;

  errorMessage = '';

  perfilLink = false;

  token: any;

  constructor(private modal: NgbModal,
              public usuariosService: UsuariosService,
              private navbarService: NavbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.navbarService.mainObservable.subscribe((data: any) => {
      this.habilitarMenu = data;
    });
    this.token = this.usuariosService.obtenerToken();
    if (this.token === null) {
      this.perfilLink = false;
    } else {
      this.usuariosService.validaToken();
      this.perfilLink = true;
    }
  }

  modalLogin(contenido): void {
    this.modal.open(contenido, {
      animation: true,
      backdrop: 'static',
      centered: true
    });
  }

  modalError(error): void {
    this.modal.open(error, {
      animation: true,
      backdrop: 'static',
      size: 'sm',
      centered: true
    });
  }

  login(fLogin: NgForm): void {
    if (fLogin.invalid) { return; }
    this.btnDisabled = true;
    this.usuariosService.login(this.loginUser.email, this.loginUser.password).subscribe((resp) => {
      this.usuariosService.guardarToken(resp.token);
      this.usuariosService.usuario = resp.usuario;
      this.perfilLink = true;
      this.btnDisabled = false;
      this.usuariosService.validaToken();
      this.modal.dismissAll();
    }, (err) => {
      console.log(err);
      this.btnDisabled = false;
      this.usuariosService.usuario = null;
      this.perfilLink = false;
      if (err.status === 400) {
        this.errorMessage = 'Usuario o contraseña incorrectos!';
      } else {
        this.errorMessage = 'No se pudo conectar con el servidor. Comuniquese con el administrador!';
      }
      this.modalError(this.error);
    });
  }

  logout(): void {
    this.usuariosService.logout();
    if (this.usuariosService.socialUsers) {
      this.usuariosService.signOut();
    }
    this.habilitarMenu = 'habilitar-menu';
    this.perfilLink = false;
  }

  async googleLogin(): Promise<void> {
    this.googleUser = await this.usuariosService.signInGoogle();
    this.usuariosService.altaUsuarioGoogle(this.googleUser.idToken).subscribe(resp => {
      this.usuariosService.guardarToken(resp.token);
      this.usuariosService.usuario = resp.usuario;
      this.perfilLink = true;
      this.btnDisabled = false;
      this.usuariosService.validaToken();
      this.modal.dismissAll();
    }, err => {
      console.log(err);
      this.btnDisabled = false;
      this.usuariosService = null;
      this.perfilLink = false;
      if (err.status === 400) {
        this.errorMessage = err.error.err.message;
      } else {
        this.errorMessage = 'No se pudo conectar con el servidor. Comuniquese con el administrador!';
      }
      this.modalError(this.error);
    });
    this.modal.dismissAll();
  }

  async facebookLogin(): Promise<void> {
    this.facebookUser = await this.usuariosService.signInFacebook();
    this.usuariosService.altaUsuarioFacebook(this.facebookUser.name, this.facebookUser.email, this.facebookUser.response.picture.data.url)
      .subscribe(resp => {
        this.usuariosService.guardarToken(resp.token);
        this.usuariosService.usuario = resp.usuario;
        this.perfilLink = true;
        this.btnDisabled = false;
        this.usuariosService.validaToken();
        this.modal.dismissAll();
      }, err => {
        console.log(err);
        this.btnDisabled = false;
        this.usuariosService.usuario = null;
        this.perfilLink = false;
        if (err.status === 400) {
          this.errorMessage = err.error.err.message;
        } else {
          this.errorMessage = 'No se pudo conectar con el servidor. Comuniquese con el administrador!';
        }
        this.modalError(this.error);
      });
    this.modal.dismissAll();
  }

  buscarPelicula(value: string): void {
    value = value.trim();
    if (value.length === 0) { return; }
    this.router.navigate(['/buscar', value]);
  }

}
