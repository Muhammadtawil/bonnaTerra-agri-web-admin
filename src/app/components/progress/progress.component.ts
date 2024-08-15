import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: '../../app.component.css'
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initializeCounters();
  }

  initializeCounters(): void {
    const counters = document.querySelectorAll('.js-count');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            this.animateCounter(counter);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(counter: HTMLElement): void {
    const target = +counter.getAttribute('data-to')!;
    const afterText = counter.getAttribute('data-afters') || '';
    const duration = 2000;
    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current).toString();
        if (afterText) {
          counter.textContent += afterText;
        }
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toString();
        if (afterText) {
          counter.textContent += afterText;
        }
      }
    };

    requestAnimationFrame(updateCounter);
  }
}
