import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { ImgLinkPipe } from './img-link.pipe';



@NgModule({
  declarations: [
    PosterPipe,
    ImgLinkPipe
  ],
  exports: [
    PosterPipe,
    ImgLinkPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
