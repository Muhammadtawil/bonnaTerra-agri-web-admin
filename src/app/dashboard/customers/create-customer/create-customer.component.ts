import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
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
import { FileUploadComponent, FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';
import { GetCustomerInteface, GetProductInterface } from '../../../services/interfaces';
import { successAlert } from '../../common/alerts/alerts';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProductsServices } from '../../../services/products.services';
import Swal from 'sweetalert2';
import { CustomerServices } from '../../../services/customers.services';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-create-customer',
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
MatStepperModule,    
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent {
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  mode: 'create' | 'edit' = 'create'; 
  customerId: string | null = null;
  isToggled = false;
  customerForm!: FormGroup;
  productsList: GetProductInterface[] = [];


    // ToppingList
    toppings = new FormControl('');
   
  constructor(
    public themeService: CustomizerSettingsService,
    private productServices: ProductsServices,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerServices: CustomerServices,
    private cdr: ChangeDetectorRef
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerJob: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAge: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      customerEmail: ['', Validators.required],
      nationality: ['', Validators.required],
      preferredProducts: [[], Validators.required], 
      address: ['', Validators.required],
      customerNotes: ['', Validators.nullValidator],
     
    });

    // Check if there's a route parameter (cUSTOMER ID)
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.mode = 'edit'; // Set mode to 'edit' if productId exists
        this.loadCustomerData(this.customerId); // Load product data for editing
      }
    });
    this.getAllProducts();
  }
  getSelectedProductsLabel(): string {
    const selectedProducts = this.customerForm.get('preferredProducts')?.value || [];
    if (selectedProducts.length === 0) {
      return 'No product selected';
    }
  
    const selectedProductNames = selectedProducts
      .map((product: any) => product.productName)
      .join(', ');
  
    return selectedProductNames;
  }
  
  
  getAllProducts() {
    return this.productServices.getProducts().subscribe({
      next: (data) => {
        this.productsList = data;
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
    });
  }

  // Load product data into the form for editing
  loadCustomerData(customerId: string): void {
    this.customerServices.getCustomerById(customerId).subscribe({
      next: (customer: GetCustomerInteface) => {
        this.customerForm.patchValue({
          customerName: customer.customerName,
          customerEmail: customer.customerEmail,
          customerAge: customer.customerAge,
          customerPhone: customer.customerPhone,
          customerNotes: customer.customerNotes,
          customerJob: customer.customerJob,
          address: customer.address,
          nationality: customer.nationality,
          preferredProducts: customer.preferredProducts || [], // Ensure array assignment
        });
      },
      error: (error: any) => {
        console.error('Error fetching customer', error);
        this.router.navigate(['/dashboard/customers']);
      },
    });
  }
  
  


  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;

      if (this.mode === 'create') {
        // Create a new Customers
        this.customerServices.createCustomer(formData).subscribe({
          next: (response: any) => {
                successAlert('Customer Added Successfully');
                this.router.navigate(['/dashboard/customers']);
            console.log('Customer created successfully', response);
          },
          error: (error: any) => {
            console.error('Error creating Customers', error);
          },
        });
      } else if (this.mode === 'edit' && this.customerId) {
        // Update the existing Customers
        this.customerServices.updateCustomer(this.customerId, formData).subscribe({
          next: (response: any) => {
            successAlert('Customers Updated Successfully');
            console.log('Customers updated successfully', response);
            // Optionally, navigate back to the Subscribers list or reset the form
            this.router.navigate(['/dashboard/customers']);
          },
          error: (error: any) => {
            console.error('Error updating Customers', error);
          },
        });
      }
    }
  }



  cancel() {
    // Implement cancel logic or navigation here
    this.router.navigate(['/dashboard/customers']);
  }
  
  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
