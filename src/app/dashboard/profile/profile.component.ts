import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { AuthServices } from '../../services/auth.services';
import {UserInterface } from '../../services/interfaces';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { successAlert } from '../common/alerts/alerts';


@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, RouterOutlet, MatMenuModule, MatButtonModule, MatCardModule, RouterLinkActive],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    userInfo: UserInterface | null = null;
        // isToggled
    isToggled = false;
    selectedFilesControl = new FormControl<File[]>([], FileUploadValidators.filesLimit(2));
    userImageUrl: string = '';
    userForm!: FormGroup;
    constructor(
        public themeService: CustomizerSettingsService,
        private userServices: AuthServices,
        private router: Router,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.getUserInfo()
    }


    getUserInfo() {
    return this.userServices.getUserInfo().subscribe({
      next: (data:UserInterface) => {
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
    
    onFileSelect(event: any): void {
        const files = event?.target?.files;
        if (files) {
          this.selectedFilesControl.setValue(Array.from(files));
        } else {
          console.error('No files or invalid event:', event);
        }
    }
   
    onSubmit(): void {
        if (this.userForm.valid) {
          const formData = new FormData();
      
          // Append all form values to FormData
          Object.keys(this.userForm.controls).forEach((key) => {
            formData.append(key, this.userForm.get(key)?.value);
          });
      
          // Append selected files
          const files = this.selectedFilesControl.value || [];
          files.forEach((file, index) => {
            formData.append(`image`, file); 
          });
    
       
            this.userServices.updateUser(formData).subscribe({
              next: (response: any) => {
                successAlert('User Image Updated Successfully');
                console.log('User Image successfully', response);
                this.router.navigate(['/dashboard/user-profile']);
              },
              error: (error: any) => {
                console.error('Error updating product', error);
              },
            });
          }
        }
      }

