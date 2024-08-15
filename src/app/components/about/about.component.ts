import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive,TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: '../../app.component.css',
})
export class AboutComponent {
  constructor(private router: Router) {}

  navigateToAboutPage() {
    this.router.navigate(['/about']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
