import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { FileUploadComponent, FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';

import { CategoryInetrface, ProductInterface, TestimonialInterface } from '../../../services/interfaces';
import { successAlert } from '../../common/alerts/alerts';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

import { TestimonialsServices } from '../../../services/testimonialsServices';

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
  templateUrl: './create-testimonial.html',
  styleUrls: ['./create-testimonial..scss'],
})
export class CreateTestimonilasComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  mode: 'create' | 'edit' = 'create'; 
  testimonialId: string | null = null;
  isToggled = false;
  testimonialForm!: FormGroup;
  selectedFilesControl = new FormControl<File[]>([], FileUploadValidators.filesLimit(1));
  senderImageUrl: string = '';
  categories: CategoryInetrface[] = [];
  product?: ProductInterface; // Define product property

  constructor(
    public themeService: CustomizerSettingsService,
    private testimonialServices: TestimonialsServices,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({
       senderName: ['', Validators.required],
       senderPosition: ['', Validators.required],
       testimonialContent: ['', Validators.required],
      isFlag: [true],
      files: this.selectedFilesControl 
    });

    // Check if there's a route parameter (product ID)
    this.route.paramMap.subscribe((params) => {
      this.testimonialId = params.get('id');
      if (this.testimonialId) {
        this.mode = 'edit'; // Set mode to 'edit' if productId exists
        this.loadProductData(this.testimonialId); // Load product data for editing
      }
    });

  }


  // Load testimonial data into the form for editing
  loadProductData(testimonialId: string): void {
    this.testimonialServices.getTestiminialByUd(testimonialId).subscribe({
      next: (testimonial: TestimonialInterface) => {
    
        this.testimonialForm.patchValue({
            senderName: testimonial.senderName,
            senderPosition: testimonial.senderPosition,
            testimonialContent: testimonial.testimonialContent,
            isFlag: testimonial.isFlag,
        
        });
        this.senderImageUrl = testimonial.senderImageUrl; // Assign testimonial image URL
      },
      error: (error: any) => {
        console.error('Error fetching testimonial', error);
        this.router.navigate(['/dashboard/create-testimonial']);
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
    if (this.testimonialForm.valid) {
      const formData = new FormData();
  
      // Append all form values to FormData
      Object.keys(this.testimonialForm.controls).forEach((key) => {
        formData.append(key, this.testimonialForm.get(key)?.value);
      });
  
      // Append selected files
      const files = this.selectedFilesControl.value || [];
      files.forEach((file, index) => {
        formData.append(`image`, file); // Changed key to `file${index}` to avoid duplicate keys
      });

      if (this.mode === 'create') {
        // Create a new testimonials
        this.testimonialServices.createTestiminial(formData).subscribe({
          next: (response: any) => {
            successAlert('testimonial Added Successfully');
            console.log('testimonial created successfully', response);
            this.router.navigate(['/dashboard/testimonials']);
          },
          error: (error: any) => {
            console.error('Error creating testimonial', error);
          },
        });
      } else if (this.mode === 'edit' && this.testimonialId) {
        // Update the existing testimonials
        this.testimonialServices.updateTestiminial(this.testimonialId, formData).subscribe({
          next: (response: any) => {
            successAlert('testimonial Updated Successfully');
            console.log('testimonial updated successfully', response);
            this.router.navigate(['/dashboard/testimonials']);
          },
          error: (error: any) => {
            console.error('Error updating testimonial', error);
          },
        });
      }
    }
  }

  cancel() {
    // Implement cancel logic or navigation here
    this.router.navigate(['/dashboard/testimonials']);
  }
  
  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
