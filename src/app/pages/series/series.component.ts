import { Component, HostListener, OnInit } from '@angular/core';
import { Serie } from '../../interfaces/series-response';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  public series: Serie[] = [];

  private desde: number;
  private limite: number;
  private totalSeries: number;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max) {
      if (this.serieService.cargando) { return; }
      if (this.series.length === this.totalSeries) { return; }
      this.desde = this.desde + this.limite;
      this.cargarSeries();
    }
  }

  constructor(private serieService: SeriesService) { }

  ngOnInit(): void {
    this.desde = 0;
    this.limite = 12;
    this.cargarSeries();
  }

  cargarSeries(): void {
    this.serieService.listadoSeries(this.desde, this.limite, '-modified').subscribe(resp => {
      this.series.push(...resp.series);
      this.totalSeries = resp.total;
      this.serieService.cargando = false;
    }, err => {
      console.error(err);
      this.serieService.cargando = false;
    });
  }

}
