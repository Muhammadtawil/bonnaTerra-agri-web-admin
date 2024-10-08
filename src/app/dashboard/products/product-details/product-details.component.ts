
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, CarouselModule,CommonModule, FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;
    increment() {
        this.value++;
    }
    decrement() {
        if (this.value > 1) {
            this.value--;
        }
    }

    // Product Images
    productImages = [
        {
            url: '../../../../assets/images/products/product-details1.jpg'
        },
        {
            url: '../../../../assets/images/products/product-details2.jpg'
        },
        {
            url: '../../../../assets/images/products/product-details3.jpg'
        },
        {
            url: '../../../../assets/images/products/product-details4.jpg'
        }
    ]
    selectedImage!: string;
    changeimage(image: string){
        this.selectedImage = image;
    }

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
