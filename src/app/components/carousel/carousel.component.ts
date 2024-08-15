import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WebFontService } from '../../../google.font';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: '../../app.component.css'
})
export class CarouselMainComponent implements OnInit {
  constructor(private webFontService: WebFontService) {}

  ngOnInit(): void {
    this.webFontService.loadWebFont();
    (() => {
      const oInterval = setInterval(() => {
        if (typeof window.jQuery !== 'undefined') {
          clearInterval(oInterval);

          const defaults = {
            slide: 0,
            delay: 5000,
            loop: true,
            preload: false,
            preloadImage: false,
            preloadVideo: false,
            timer: true,
            overlay: false,
            autoplay: true,
            shuffle: false,
            cover: true,
            color: null,
            align: 'center',
            valign: 'center',
            firstTransition: null,
            firstTransitionDuration: null,
            transition: 'fade',
            transitionDuration: 1000,
            transitionRegister: [],
            animation: null,
            animationDuration: 'auto',
            animationRegister: [],
            init: function () {},
            play: function () {},
            pause: function () {},
            walk: function () {},
            slides : [
              { name: 'img 4', src: '../assets/img/home_img/landing1.jpg' },
              { name: 'img 1', src: '../assets/img/home_img/landing4.jpg' },
              { name: 'img 2', src: '../assets/img/home_img/landing3.jpg' },
              { name: 'img 3', src: '../assets/img/home_img/landing1.jpg' },
              { name: 'img 5', src: '../assets/img/home_img/landing3.jpg' },
            ],
          };

      

          jQuery(document).ready(function ($: any) {
            const slider = $('#vegas-slider');
            const slides = [
              { name: 'img 4', src: '../assets/img/home_img/landing7.jpg' },
              { name: 'img 1', src: '../assets/img/home_img/landing4.jpg' },
              { name: 'img 2', src: '../assets/img/home_img/landing5.jpg' },
              { name: 'img 3', src: '../assets/img/home_img/landing8.jpg' },
              // { name: 'img 5', src: '../assets/img/home_img/landing3.jpg' },
            ];
            const slider_content = $('.start-screen__content');
            let dots: any;
            let a: any;
            let x: any;

            slider.vegas({
              autoplay: true,
              timer: false,
              preloadImage: true,
              transition: [
                'fade',
                'zoomOut',
                'blur',
                'swirlLeft',
                'swirlRight',
              ],
              transitionDuration: 4000,
              delay: 5000,
              slides: slides,
              overlay: '../assets/img/home_img/overlays/04.png',
              init: function (globalSettings: any) {
                if ($(this).data('dots') === true) {
                  const $this = $(this);
                  dots = $('<nav class="vegas-dots"></nav>');

                  $this.find('.vegas-control').append(dots);

                  for (let i = 0; i < slides.length; i++) {
                    x = $('<a href="#" class="paginatorLink"></a>');

                    x.on('click', (e: any) => {
                      e.preventDefault();
                      $this.vegas('jump', dots.find('a').index(x));
                    });

                    dots.append(x);
                  }

                  a = dots.find('a');
                  a.eq(0).addClass('active');
                  slider_content.eq(0).addClass('active');
                }
              },
              play: function (index: any, slideSettings: any) {},
              walk: function (index: any, slideSettings: any) {
                if ($(this).data('dots') === true) {
                  a.removeClass('active').eq(index).addClass('active');
                }
                slider_content.removeClass('active').eq(index).addClass('active');
              },
            });

            $('#vegas-control__prev').on('click', function () {
              slider.vegas('previous');
            });

            $('#vegas-control__next').on('click', function () {
              slider.vegas('next');
            });
          });
        }
      }, 500);
    })();
  }
}