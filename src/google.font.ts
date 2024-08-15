import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebFontService {
  loadWebFont() {
    const WebFontConfig = {
      google: { families: ['Poppins:300,400,500,600,700', 'Raleway:400,400i,500,500i,700,700i'] }
    };

    (function() {
      const wf = document.createElement('script');
      wf.src = (document.location.protocol === 'https:' ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
      wf.type = 'text/javascript';
      wf.async = true;
      const s = document.getElementsByTagName('script')[0];

      if (s && s.parentNode) {  // Add this null check
        s.parentNode.insertBefore(wf, s);
      } else {
        console.error('Could not find a script tag to insert the WebFont script.');
      }
    })();

    (window as any).WebFontConfig = WebFontConfig;
  }
}
