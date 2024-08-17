import { Component, OnInit } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd
} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrolltopComponent } from './components/scrolltop/scrolltop.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "./components/footer/footer.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    HomeComponent,
    NavbarComponent,
    ScrolltopComponent,
    TranslateModule,
    FooterComponent,
    CommonModule,
],
  providers: [TranslateService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showNavbar = true;
  showFooter = true;
  showScrollButton = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        this.showNavbar = !url.startsWith('/dashboard') 
        this.showFooter = !url.startsWith('/dashboard');
        this.showScrollButton = !url.startsWith('/dashboard');

      });
  }
}