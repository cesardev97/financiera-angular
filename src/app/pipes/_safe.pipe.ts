import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OptionsStoreService } from '@store/general/options.service';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string = "", type: string = "", menuItemType?:string): any {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'url':
                let url = value.replace(environment.wordpressWS, '').replace(/\/+$/, '');
                return this.sanitizer.bypassSecurityTrustUrl(url);
            case 'src':
                let src = value.replace(environment.wordpressWS, '').replace(/\/+$/, '');
                return this.sanitizer.bypassSecurityTrustResourceUrl(src);
            case 'src2':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                let def = value.replace(environment.wordpressWS, '').replace(/\/+$/, '');
                return this.sanitizer.sanitize(SecurityContext.URL, this.sanitizer.bypassSecurityTrustUrl(def));
        }
    }

}
    