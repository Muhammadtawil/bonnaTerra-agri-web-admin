import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServices } from '../../../services/auth.services';
import { UserInterface } from '../../../services/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { successAlert } from '../../common/alerts/alerts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FileUploadModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent implements OnInit {
  // Select Value
  genderSelected = 'option1';

  // File Uploader
  public multiple: boolean = false;

  // isToggled
  isToggled = false;
  userInfo: UserInterface | null = null;
  selectedFilesControl = new FormControl<File[]>(
    [],
    FileUploadValidators.filesLimit(2)
  );
  userImageUrl: string = '';
  userForm!: FormGroup;
  constructor(
    public themeService: CustomizerSettingsService,
    private userServices: AuthServices,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
    this.loadUserData();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required], // Required field
      userEmail: ['', Validators.required], // Required field
      userBio: [''], // Optional field
      userPosition: [''], // Optional field
      userPhone: [null, [
        Validators.required, 
        Validators.pattern('^[0-9]{7,15}$') // Numbers only, between 7 to 15 digits
      ]],
      
      userFacebookUrl: [''], // Optional field
      userLinkedInUrl: [''], // Optional field
      userTwitterUrl: [''], // Optional field
      userInstagramUrl: [''], // Optional field
      files: this.selectedFilesControl, // Custom control
    });
  }
  // Load product data into the form for editing
  loadUserData(): void {
    this.userServices.getUserInfo().subscribe({
      next: (user: UserInterface) => {
        this.userForm.patchValue({
          userName: user.userName,
          userEmail: user.userEmail,
          userBio: user.userBio,
          userPosition: user.userPosition,
          userPhone: user.userPhone,
          userFacebookUrl: user.userFacebookUrl,
          userLinkedInUrl: user.userLinkedInUrl,
          userTwitterUrl: user.userTwitterUrl,
          userInstagramUrl: user.userInstagramUrl,
        });
        this.userImageUrl = user.userImgUrl;
      },
      error: (error: any) => {
        console.error('Error fetching product', error);
        this.router.navigate(['/dashboard/user-profile']);
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
        const controlValue = this.userForm.get(key)?.value;
        if (controlValue) {
          formData.append(key, controlValue);
        }
      });

      // Append selected files
      const files = this.selectedFilesControl.value || [];
      files.forEach((file) => {
        formData.append('image', file); // Append files with key 'image'
      });

      // Log the formData content
      // Log the formData content using forEach
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.userServices.updateUser(formData).subscribe({
        next: (response: any) => {
          successAlert('User updated successfully');
          console.log('User updated successfully', response);
          this.router.navigate(['/dashboard/user-profile']);
        },
        error: (error: any) => {
          console.error('Error updating user', error);
        },
      });
    }
  }

  cancel() {
    // Implement cancel logic or navigation here
    this.router.navigate(['/dashboard/products-grid']);
  }
}
