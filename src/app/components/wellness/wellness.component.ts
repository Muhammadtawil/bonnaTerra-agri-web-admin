import { Component, AfterViewInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { jarallax } from 'jarallax';

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wellness.component.html',
  styleUrls: ['../../../styles.css']
})
export class WellnessComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeJarallax();
  }

  private initializeJarallax(): void {
    const nJarallax = document.querySelectorAll('.jarallax');

    if (window.device.desktop() && nJarallax.length > 0) {
      jarallax(nJarallax, {
        type: 'scroll',
        zIndex: -20
      });
    }
  }
}
