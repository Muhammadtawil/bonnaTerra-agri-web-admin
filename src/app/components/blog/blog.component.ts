import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './blog.component.html',
  styleUrl: '../../app.component.css'
})
export class BlogComponent {
  constructor(private router: Router) {}

  navigateToNewsPage() {
    this.router.navigate(['/news']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
