import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { SellerServices } from '../../../services/sellers.services';
import { SellerInterFace } from '../../../services/interfaces';
import { successAlert } from '../../common/alerts/alerts';

@Component({
  selector: 'app-create-seller',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
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
  templateUrl: './create-seller.component.html',
  styleUrl: './create-seller.component.scss',
})
export class CreateSellerComponent {
    mode: 'create' | 'edit' = 'create'; 
    sellerForm!: FormGroup;
    sellerId: string | null = null;
  // isToggled
  isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
      private  sellerService: SellerServices,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }


    ngOnInit(): void {
        this.sellerForm = this.fb.group({
            sellerName: ['', Validators.required],
            sellerPhone: ['', Validators.required],
            sellerEmail: ['', Validators.required],
            sellerWebsite: ['',],
            sellerOffer: ['', Validators.required],
            sellerAddress: ['', Validators.required],
        });
        this.route.paramMap.subscribe((params) => {
            this.sellerId = params.get('id');
            if (this.sellerId) {
              this.mode = 'edit'; // Set mode to 'edit' if productId exists
              this.loadCustomerData(this.sellerId); // Load product data for editing
            }
          });
        
    }

    loadCustomerData(sellerId: string): void {
        this.sellerService.getSellerById(sellerId).subscribe({
          next: (seller: SellerInterFace) => {
            this.sellerForm.patchValue({
                sellerName: seller.sellerName,
                sellerPhone: seller.sellerPhone,
                sellerEmail: seller.sellerEmail,
                sellerWebsite: seller.sellerWebsite,
                sellerOffer: seller.sellerOffer,
                sellerAddress: seller.sellerAddress,
            
            });
          },
          error: (error: any) => {
            console.error('Error fetching customer', error);
            this.router.navigate(['/dashboard/customers']);
          },
        });
      }
      
    
  onSubmit(): void {
    if (this.sellerForm.valid) {
      const formData = this.sellerForm.value;

      if (this.mode === 'create') {
        // Create a new Seller
        this.sellerService.createSeller(formData).subscribe({
          next: (response: any) => {
                successAlert('Seller Added Successfully');
                this.router.navigate(['/dashboard/sellers']);
            console.log('Seller created successfully', response);
          },
          error: (error: any) => {
            console.error('Error creating Seller', error);
          },
        });
      } else if (this.mode === 'edit' && this.sellerId) {
        // Update the existing Seller
        this.sellerService.updateSeller(this.sellerId, formData).subscribe({
          next: (response: any) => {
            successAlert('Seller Updated Successfully');
            console.log('Seller updated successfully', response);
            // Optionally, navigate back to the Subscribers list or reset the form
            this.router.navigate(['/dashboard/sellers']);
          },
          error: (error: any) => {
            console.error('Error updating Seller', error);
          },
        });
      }
    }
  }

    
      // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
    
    

      
    }

 




