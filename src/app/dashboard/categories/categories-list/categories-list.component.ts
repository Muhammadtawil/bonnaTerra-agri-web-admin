import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';


@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatCheckboxModule, MatSliderModule, FormsModule, MatButtonModule, MatIconModule,RouterOutlet],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
 // Price
 startValue = 10;
 endValue = 4500;

 // isToggled
 isToggled = false;

 constructor(
     public themeService: CustomizerSettingsService
 ) {
     this.themeService.isToggled$.subscribe(isToggled => {
         this.isToggled = isToggled;
     });
 }

}
