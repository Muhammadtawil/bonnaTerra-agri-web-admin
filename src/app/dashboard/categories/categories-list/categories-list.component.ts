import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CategoriesServices } from '../../../services/categoris.services';
import { CategoryInetrface } from '../../../services/interfaces';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterLink, MatCardModule,MatMenuModule, MatCheckboxModule, MatSliderModule, FormsModule, MatButtonModule, MatIconModule,RouterOutlet],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {

    mode: 'create' | 'edit' = 'create';

 // isToggled
 isToggled = false;

 constructor(
     public themeService: CustomizerSettingsService,
     private categoriesServices: CategoriesServices,
 ) {
     this.getAllCategories()
     this.themeService.isToggled$.subscribe(isToggled => {
         this.isToggled = isToggled;
     });
 }
    categories: CategoryInetrface[] = [];
    getAllCategories() {
        return this.categoriesServices.getCategories().subscribe({
            next: (data) => {
                this.categories=data
            },
            error: (err) => {
                Swal.fire({
                    title: "Error!",
                    text: err,
                    icon: "warning",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
            }
        })
    }

}
