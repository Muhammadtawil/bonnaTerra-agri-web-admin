import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { UserInterface } from '../../../services/interfaces';
import Swal from 'sweetalert2';
import { AuthServices } from '../../../services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-about',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class ProfileAboutComponent {
  // isToggled
  isToggled = false;
  userInfo: UserInterface | null = null;

  constructor(
    public themeService: CustomizerSettingsService,
    private userServices: AuthServices
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
    this.getUserInfo();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  getUserInfo() {
    return this.userServices.getUserInfo().subscribe({
      next: (data: UserInterface) => {
        console.log('User received:', data);
        this.userInfo = data;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'warning',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }
}
