import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgLink'
})
export class ImgLinkPipe implements PipeTransform {

  transform(link: string): string {
    if (link.substr(0, 4) === 'http') {
      return link;
    } else {
      return `../../../assets/avatars/${link}`;
    }
  }

}
