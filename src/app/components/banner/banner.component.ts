import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../../model/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {

  @Input() banner: Banner;
  showAd = environment.adsense.show;

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          overlays: { bottom: true }
        });
      } catch (e) {
        console.error(e);
      }
    }, 0);
  }

}
