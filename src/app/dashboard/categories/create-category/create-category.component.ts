import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CategoriesServices } from '../../../services/categoris.services';
import { successAlert } from '../../common/alerts/alerts';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  categoryForm!: FormGroup;

  public multiple: boolean = false;
  isToggled = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private categoriesServices: CategoriesServices,
    private fb: FormBuilder
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryArabicName: ['', Validators.required],
      categoryDescription: ['', Validators.required], // Textarea for description
      inStock: ['true'],
      onWeb: ['false']
    });
  }

  ngOnDestroy(): void {
    // Cleanup logic if any (currently not used)
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;

      this.categoriesServices.createCategory(formData).subscribe({
        next: (response: any) => {
          successAlert('Category Added Sucessfully')
          this.categoryForm.reset({
            categoryName: '',
            categoryArabicName: '',
            categoryDescription: '',
            inStock: 'true',
            onWeb: 'false'
          });
        },
        error: (error: any) => {
          console.error('Error creating category', error);
        }
      });
    }
  }

  onCancel(): void {
    // Handle the cancel action here
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
