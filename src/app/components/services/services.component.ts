import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrls:[ './services.component.css','../../../styles.css']
})
export class ServicesComponent {
  constructor(private router: Router) {}

  navigateToAboutPage() {
    this.router.navigate(['/about']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const parallaxElement = document.querySelector('.parallax-section') as HTMLElement;

    if (parallaxElement) {
      const speed = 0.5; // Adjust this value to control the speed of the parallax effect
      parallaxElement.style.transform = `translateY(${scrollTop * speed}px)`;
    }
  }
}
