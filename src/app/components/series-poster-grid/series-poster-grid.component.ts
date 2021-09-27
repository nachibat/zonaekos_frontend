import { Component, OnInit, Input } from '@angular/core';
import { Serie } from '../../interfaces/series-response';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series-poster-grid',
  templateUrl: './series-poster-grid.component.html',
  styleUrls: ['./series-poster-grid.component.css']
})
export class SeriesPosterGridComponent implements OnInit {

  @Input() series: Serie[] = [];

  constructor(private router: Router,
              public serieService: SeriesService) { }

  ngOnInit(): void {
  }

  onSerieClick(serie: Serie): void {
    this.router.navigate(['/post-serie', serie._id]);
  }

}
