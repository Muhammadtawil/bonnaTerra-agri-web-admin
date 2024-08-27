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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CategoriesServices } from '../../../services/categoris.services';
import { successAlert } from '../../common/alerts/alerts';
import { CategoryInetrface } from '../../../services/interfaces';

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
  mode: 'create' | 'edit' = 'create'; // Mode to differentiate create or edit
  categoryId: string | null = null; // To store the category ID for edit mode
  isToggled = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router, // Inject Router
    private categoriesServices: CategoriesServices,
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    // Initialize the form
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryArabicName: ['', Validators.required],
      categoryDescription: ['', Validators.required], // Textarea for description
      inStock: ['true'],
      onWeb: ['false'],
    });

    // Check if there's a route parameter (category ID)
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.mode = 'edit'; // Set mode to 'edit' if categoryId exists
        this.loadCategoryData(this.categoryId); // Load category data for editing
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup logic if any (currently not used)
  }

  // Load category data into the form for editing
  loadCategoryData(categoryId: string): void {
    this.categoriesServices.getCategoryByID(categoryId).subscribe({
      next: (category: CategoryInetrface) => {
        this.categoryForm.patchValue(category); // Pre-fill the form with category data
      },
      error: (error: any) => {
        console.error('Error fetching category', error);
        // Optionally, redirect back to the list if the category isn't found
        this.router.navigate(['/dasboard/categories']);
      },
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;

      if (this.mode === 'create') {
        // Create a new category
        this.categoriesServices.createCategory(formData).subscribe({
          next: (response: any) => {
            successAlert('Category Added Successfully');
            console.log('Category created successfully', response);
          },
          error: (error: any) => {
            console.error('Error creating category', error);
          },
        });
      } else if (this.mode === 'edit' && this.categoryId) {
        // Update the existing category
        this.categoriesServices.updateCategory(this.categoryId, formData).subscribe({
          next: (response: any) => {
            successAlert('Category Updated Successfully');
            console.log('Category updated successfully', response);
            // Optionally, navigate back to the categories list or reset the form
            // this.router.navigate(['/categories']);
          },
          error: (error: any) => {
            console.error('Error updating category', error);
          },
        });
      }
    }
  }

  onCancel(): void {
    // Navigate back to the categories list or reset the form
    this.router.navigate(['/dashboard/categories']);
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}