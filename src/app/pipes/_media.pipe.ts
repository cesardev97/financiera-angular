import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'media' })
export class MediaPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(url: string, type: string) {

        if (type === "video") {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            const videoId = (match && match[2].length === 11) ? match[2] : null;
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
        
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
    