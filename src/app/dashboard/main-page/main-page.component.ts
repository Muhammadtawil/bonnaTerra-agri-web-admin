import { Component, inject } from '@angular/core';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet, Event as RouterEvent } from '@angular/router'; // Import Event as RouterEvent
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { ToggleService } from '../sidebar/toggle.service';
import { CustomizerSettingsComponent } from '../customizer-settings/customizer-settings.component';
import { PostServices } from '../../services/post.services';
import { data } from 'jquery';


interface Post {
    id: string;
    sellerName: string;
    sellerPhone: number;
    sellerEmail: string;

  }
@Component({
  selector: 'dash-main-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, CustomizerSettingsComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['../styles/dashboard.style.scss','./main-page.component.scss',] // Note: Renamed to `styleUrls` from `styleUrl`
})
export class DashMainComponent {

    postService = inject(PostServices)
    posts :Post[]=[];

constructor(
 
) {
    this.postService.getPosts().subscribe({
        next: (data) => {
            this.posts = data;
        },
        error: (err) => {
            console.log(err)
        }
    })
}
    
}
