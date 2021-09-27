import { Component, OnInit } from '@angular/core';
import { Banner } from '../../model/banner';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  banner: Banner;

  constructor() {
    this.banner = new Banner('ca-pub-6221256979825970', 3, 'auto', true);
  }

  ngOnInit(): void {
  }

}
