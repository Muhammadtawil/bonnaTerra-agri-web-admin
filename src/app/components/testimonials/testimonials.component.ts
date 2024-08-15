import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['../../app.component.css'],
  standalone: true,
})
export class TestimonialsComponent implements OnInit {

  ngOnInit(): void {
    this.initializeOwlCarousel();
  }

  initializeOwlCarousel(): void {
    
    (() => {
      
      const oInterval = setInterval(() => {
        if (typeof window.jQuery !== 'undefined') {
          clearInterval(oInterval);
          jQuery(document).ready(function ($: any) {
            const fSlider = $('.feedbacks--slider .owl-carousel');
      
            if (fSlider.length > 0) {
              fSlider.children('.owl-carousel').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 6000,
                autoplayHoverPause: true,
                autoHeight: true,
                smartSpeed: 1000,
                margin: 30,
                navText: [
                  '<i class="fa fa-angle-left"></i>',
                  '<i class="fa fa-angle-right"></i>'
                ],
                responsive: {
                  0: {
                    items: 1
                  },
                  992: {
                    items: 1
                  }
                }
              });
            }
          }
          );
  
        }
        }, 500);
    })(); 
  
  }

}

