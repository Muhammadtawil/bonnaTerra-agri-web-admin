import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, } from '@angular/router'; 



@Component({
  selector: 'app-products-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './products-main.component.html',
  styleUrls: ['../../app.component.css','./products-main.component.css']
})
export class ProductsMainComponent {
  constructor(private router: Router) { }

  navigateToProducts() {
    this.router.navigate(['/category']).then(() => {
      window.scrollTo(0, 0); // Scroll to the top
    });
  }
}
