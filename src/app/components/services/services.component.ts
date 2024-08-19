import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: '../../app.component.css'
})
export class ServicesComponent {
  constructor(private router: Router) {}

  navigateToAboutPage() {
    this.router.navigate(['/about']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
