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
export class AboutComponent {
  constructor(private router: Router) {}

  navigateToAboutPage() {
    this.router.navigate(['/about']).then(() => {
      window.scrollTo(0, 0);
    });
  }



}
