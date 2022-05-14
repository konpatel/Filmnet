import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
