import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { SellerInterFace } from '../../services/interfaces';
import { SellerServices } from '../../services/sellers.services';
import { ErrorAlert } from '../common/alerts/alerts';
@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgFor],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss'
})
export class SellersComponent {
    sellersList: SellerInterFace[] = [];
    mode: 'create' | 'edit' = 'create'; 

    constructor(
        public themeService: CustomizerSettingsService,
        private sellerService:SellerServices,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.getAllSeller();
    }


    // get ALl Sellers 
    
    getAllSeller() {
        return this.sellerService.getAllSellers().subscribe({
            next: (data) => {
                this.sellersList = data;
            }, error: (err) => {
                ErrorAlert(err)
            }
        })
    }


// isToggled
isToggled = false;



}