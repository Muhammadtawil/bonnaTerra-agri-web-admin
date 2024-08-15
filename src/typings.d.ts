// import * as $ from 'jquery';

// declare module 'vegas' {
//   interface VegasOptions {
//     autoplay?: boolean;
//     timer?: boolean;
//     preloadImage?: boolean;
//     transition?: string[];
//     transitionDuration?: number;
//     delay?: number;
//     slides?: { name: string, src: string }[];
//     overlay?: string;
//     init?: (globalSettings: any) => void;
//     play?: (index: number, slideSettings: any) => void;
//     walk?: (index: number, slideSettings: any) => void;
//   }

//   interface VegasMethods {
//     jump(index: number): void;
//     previous(): void;
//     next(): void;
//   }

//   interface JQuery {
//     vegas(options?: VegasOptions): JQuery;
//     vegas(method: keyof VegasMethods, ...args: any[]): JQuery;
//   }
// }

declare interface JQuery {
    owlCarousel(options?: any): JQuery;
  }
  