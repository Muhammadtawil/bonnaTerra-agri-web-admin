// import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class TranslationService {
//   constructor(private translate: TranslateService) {
//     // Add supported languages
//     this.translate.addLangs(['en', 'ar']);
    
//     // Get browser language or fallback to a default
//     const browserLang = this.translate.getBrowserLang();
//     const defaultLang = browserLang && browserLang.match(/en|ar/) ? browserLang : 'en';
    
//     // Set default language
//     this.translate.setDefaultLang(defaultLang);
//   }

//   switchLanguage(language: string) {
//     this.translate.use(language);
//   }
// }
