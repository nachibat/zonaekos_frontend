import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetaTag } from '../model/meta-tag';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private urlMeta = 'og:url';
  private titleMeta = 'og:title';
  private descriptionMeta = 'og:description';
  private imageMeta = 'og:image';
  private secureImageMeta = 'og:image:secure_url';

  constructor(private metaService: Meta) { }

  public setFacebookTags(url: string, title: string, description: string, image: string): void {
    const formatUrl = url;
    const imageUrl = `https://image.tmdb.org/t/p/w300${image}`;
    const tags = [
      new MetaTag(this.urlMeta, formatUrl),
      new MetaTag(this.titleMeta, title),
      new MetaTag(this.descriptionMeta, description),
      new MetaTag(this.imageMeta, imageUrl),
      new MetaTag(this.secureImageMeta, imageUrl)
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      this.metaService.updateTag({
        property: siteTag.name,
        content: siteTag.value
      });
    });
  }

}
