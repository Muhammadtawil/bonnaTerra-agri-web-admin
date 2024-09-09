import { CommonModule, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { NotificationServices } from '../../services/notifications.services';
import { ErrorAlert } from '../common/alerts/alerts';
import { NotificationInertface } from '../../services/interfaces';



@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive,CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    userName = localStorage.getItem('username')
    userRole = localStorage.getItem('userRole')
    userImage=localStorage.getItem('userImage')
    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    notificationList: NotificationInertface[] = [];
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private notifcationService:NotificationServices,
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.getNotifications()
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }
    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
          this.toggle();
          event.preventDefault(); // Prevent default action like scrolling.
        }
      }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    getNotifications() {
        this.notifcationService.getAllNotifications().subscribe({
          next: (data) => {
            this.notificationList = data;
          },
          error: (err) => {
         ErrorAlert(err)
          }
        });
      }
    

}