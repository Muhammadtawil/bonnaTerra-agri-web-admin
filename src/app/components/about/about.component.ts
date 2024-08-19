import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { jarallax } from 'jarallax';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive,TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['../../../styles.css','./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.initializeJarallax();
  }

  navigateToAboutPage() {
    this.router.navigate(['/about']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  private initializeJarallax(): void {
    const oInterval = setInterval(() => {
      if (typeof window.jQuery !== 'undefined') {
        clearInterval(oInterval);

        const nJarallax = document.querySelectorAll('.jarallax');

        if (window.device.desktop() && nJarallax.length > 0) {
          jarallax(nJarallax, {
            type: 'scroll',
            zIndex: -20
          });
        }
      }
    }, 500);
  }
}
