import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuariosService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaAdmin();
  }

}
