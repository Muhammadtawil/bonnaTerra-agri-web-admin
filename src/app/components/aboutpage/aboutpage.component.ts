import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './aboutpage.component.html',
  styleUrls: ['../../app.component.css','./aboutpage.component.css']
})
export class AboutpageComponent implements OnInit {

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Wait for jQuery to load
    const checkJQuery = setInterval(() => {
      if (typeof window.jQuery !== 'undefined') {
        clearInterval(checkJQuery);

        // Initialize charts when elements appear in the viewport
        $('.skill__item').appear(() => {
          const _self = $(this);
          setTimeout(() => {
            this._chartInit(_self);
          }, 200);
        }); 
      }
    }, 500);
  }

  private _chartInit(el: any): void {
    // Initialize the easyPieChart
    $('.js-chart', el).each(function () {
      $(this).easyPieChart({
        easing: 'easeOutElastic',
        delay: 3000,
        barColor: '#369670',
        trackColor: '',
        scaleColor: false,
        lineWidth: 12,
        trackWidth: 12,
        size: 175,
        lineCap: 'butt',
        onStep: function (from: any, to: any, percent: any) {
          this.el.children[0].innerHTML = Math.round(percent).toString();
        }
      });
    });
  }
}
