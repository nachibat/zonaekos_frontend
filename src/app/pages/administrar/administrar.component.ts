import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  public adminPeliculas = true;
  public adminSeries = false;
  public adminJuegos = false;

  constructor() { }

  ngOnInit(): void {
  }

  cambioListado(event): void {
    switch (event) {
      case 'peliculas':
        this.adminPeliculas = true;
        this.adminSeries = false;
        this.adminJuegos = false;
        break;
      case 'series':
        this.adminPeliculas = false;
        this.adminSeries = true;
        this.adminJuegos = false;
        break;
      case 'juegos':
        this.adminPeliculas = false;
        this.adminSeries = false;
        this.adminJuegos = true;
        break;
    }
  }

}
