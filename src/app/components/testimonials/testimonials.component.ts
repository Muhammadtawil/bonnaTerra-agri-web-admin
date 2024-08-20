import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['../../../styles.css','./testimonials.component.css'],
  standalone: true,
})
export class TestimonialsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initializeOwlCarousel();
  }

  initializeOwlCarousel(): void {
    const oInterval = setInterval(() => {
      if (typeof window.jQuery !== 'undefined' && $.default('.feedbacks--slider .owl-carousel').length > 0) {
        clearInterval(oInterval);

        jQuery('.feedbacks--slider .owl-carousel').owlCarousel({
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
    }, 500);
  }
}
