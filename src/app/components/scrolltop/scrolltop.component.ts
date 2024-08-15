import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AvatarComponent, TextColorDirective, } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
@Component({
  selector: 'app-scrolltop',
  standalone: true,
  imports: [TextColorDirective, AvatarComponent,CommonModule,IconDirective],
  templateUrl: './scrolltop.component.html',
  styleUrl: './scrolltop.component.css'
})
export class ScrolltopComponent {
  showScroll: boolean | undefined;
  showScrollHeight = 200;
  hideScrollHeight = 200;

  constructor() { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      ) > this.showScrollHeight
    ) {
      this.showScroll = true;
    } else if (this.showScroll &&
      (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
    }
  }

  ngOnInit() {
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}