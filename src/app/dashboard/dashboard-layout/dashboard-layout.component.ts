import { Component } from '@angular/core';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet, Event as RouterEvent } from '@angular/router'; // Import Event as RouterEvent
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { ToggleService } from '../sidebar/toggle.service';
import { CustomizerSettingsComponent } from '../customizer-settings/customizer-settings.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, FooterComponent, CustomizerSettingsComponent, NgClass],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
    
 // Title
  title = 'Daxa - Angular 18 Material Design Admin Dashboard Template';

  // isSidebarToggled
  isSidebarToggled = false;

  // isToggled
  isToggled = false;

  constructor(
      public router: Router,
      private toggleService: ToggleService,
      private viewportScroller: ViewportScroller,
      public themeService: CustomizerSettingsService
  ) {
      this.router.events.subscribe((event: RouterEvent) => { // Use RouterEvent here
          if (event instanceof NavigationEnd) {
              // Scroll to the top after each navigation end
              this.viewportScroller.scrollToPosition([0, 0]);
          }
      });
      this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
          this.isSidebarToggled = isSidebarToggled;
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }
}
