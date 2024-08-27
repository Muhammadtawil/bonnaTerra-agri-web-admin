import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent, FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';

import { CategoryInetrface, ProductInterface } from '../../../services/interfaces';
import { successAlert } from '../../common/alerts/alerts';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProductsServices } from '../../../services/products.services';
import { CategoriesServices } from '../../../services/categoris.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxEditorModule,
  ],
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  
  mode: 'create' | 'edit' = 'create'; 
  productId: string | null = null;
  isToggled = false;
  productForm!: FormGroup;
  selectedFile: File | null = null; // Track the selected file



  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  categories: CategoryInetrface[] = [];
  selectedFiles: File[] = [];
  selectedFilesControl = new FormControl<File[]>([], FileUploadValidators.filesLimit(2));


  constructor(
    public themeService: CustomizerSettingsService,
    private productServices: ProductsServices,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryServices:CategoriesServices,
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productArabicName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      startMonth: ['', Validators.required],
      endMonth: ['', Validators.required],
      categoryId: ['', Validators.required],
      isStock: [true],
      onWeb: [false],
      files: this.selectedFilesControl 
    });

    // Check if there's a route parameter (product ID)
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.mode = 'edit'; // Set mode to 'edit' if productId exists
        this.loadProductData(this.productId); // Load product data for editing
      }
    });
    this.getAllCategories()

  }

  getAllCategories() {
    return this.categoryServices.getCategories().subscribe({
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

  // Load product data into the form for editing
  loadProductData(productId: string): void {
    this.productServices.getProductByID(productId).subscribe({
      next: (product: ProductInterface) => {
        this.productForm.patchValue(product); 
      },
      error: (error: any) => {
        console.error('Error fetching product', error);
        this.router.navigate(['/dashboard/create-product']);
      },
    });
  }
  

  // Handle file selection
  onFileSelect(event: any): void {
    if (event && event.target && event.target.files) {
      console.log('Files selected:', event.target.files);
      this.selectedFiles = Array.from(event.target.files);
    } else {
      console.error('No files or invalid event:', event);
    }
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
  
      // Append all form values to FormData
      Object.keys(this.productForm.controls).forEach((key) => {
        formData.append(key, this.productForm.get(key)?.value);
      });
  
      // Append selected files
      const files = this.selectedFilesControl.value || [];
      files.forEach((file, index) => {
        formData.append(`image`, file);
      });


      if (this.mode === 'create') {
        // Create a new product
        this.productServices.createProduct(formData).subscribe({
          next: (response: any) => {
            successAlert('Product Added Successfully');
            console.log('Product created successfully', response);
            this.router.navigate(['/dashboard/create-product']);
          },
          error: (error: any) => {
            console.error('Error creating product', error);
          },
        });
      } else if (this.mode === 'edit' && this.productId) {
        // Update the existing product
        this.productServices.updateProduct(this.productId, formData).subscribe({
          next: (response: any) => {
            successAlert('Product Updated Successfully');
            console.log('Product updated successfully', response);
            this.router.navigate(['/dashboard/create-product']);
          },
          error: (error: any) => {
            console.error('Error updating product', error);
          },
        });
      }
    }
  }

  cancel() {
    throw new Error('Method not implemented.');
  }
  
  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
