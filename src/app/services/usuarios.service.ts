import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListUsuariosResponse, UsuariosResponse, Usuario, UsuarioResponse } from '../interfaces/usuarios-response';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public url = environment.URL;
  public token: string = null;
  public usuario: Usuario = null;
  public socialUsers = false;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: SocialAuthService,
              @Inject(PLATFORM_ID) private platformId) { }

  getUsuarios(): Observable<ListUsuariosResponse> {
    return this.http.get<ListUsuariosResponse>('http://localhost:3000/usuarios?limite=20');
  }

  getUsuario(): Observable<UsuarioResponse> {
    this.obtenerToken();
    if (!this.token) {
      this.router.navigate(['/home']);
    } else {
      const headers = new HttpHeaders({
        token: this.token
      });
      return this.http.get<UsuarioResponse>(`${this.url}/usuario`, { headers });
    }
  }

  login(email: string, password: string): Observable<UsuariosResponse> {
    this.socialUsers = false;
    const data = { email, password };
    return this.http.post<UsuariosResponse>(`${this.url}/login`, data);
  }

  logout(): void {
    this.token = null;
    this.usuario = null;
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  signInGoogle(): Promise<SocialUser> {
    this.socialUsers = true;
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInFacebook(): Promise<SocialUser> {
    this.socialUsers = true;
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut().catch(e => console.log('Credenciales borradas'));
  }

  async guardarToken(token: string): Promise<void> {
    await localStorage.setItem('token', token);
  }

  obtenerToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      return this.token;
    }
  }

  async validaToken(): Promise<boolean> {
    await this.obtenerToken();
    if (!this.token) {
      this.router.navigate(['/home']);
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        token: this.token
      });
      this.http.get(`${this.url}/usuario`, { headers }).subscribe((resp: UsuarioResponse) => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          if (this.usuario.google || this.usuario.facebook) {
            this.socialUsers = true;
          } else {
            this.socialUsers = false;
          }
          resolve(true);
        } else {
          this.router.navigate(['/home']);
          resolve(false);
        }
      });
    });
  }

  async validaAdmin(): Promise<boolean> {
    await this.obtenerToken();
    if (!this.token) {
      this.router.navigate(['/home']);
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({ token: this.token });
      this.http.get(`${this.url}/usuario`, { headers }).subscribe((resp: UsuarioResponse) => {
        if (!resp.ok) {
          return resolve(false);
        }
        if (resp.usuario.role === 'ADMIN_ROLE') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  modificarPerfil(id: string, nombre: string): Observable<UsuarioResponse> {
    const headers = new HttpHeaders({
      token: this.token
    });
    const body = {
      fullname: nombre
    };
    return this.http.put<UsuarioResponse>(`${this.url}/perfil/${id}`, body, { headers });
  }

  altaUsuarioGoogle(token): Observable<UsuariosResponse> {
    const body = {
      idtoken: token
    };
    return this.http.post<UsuariosResponse>(`${this.url}/google`, body);
  }

  altaUsuarioFacebook(name, email, img): Observable<UsuariosResponse> {
    const body = {
      name,
      email,
      img
    };
    return this.http.post<UsuariosResponse>(`${this.url}/facebook`, body);
  }

}
