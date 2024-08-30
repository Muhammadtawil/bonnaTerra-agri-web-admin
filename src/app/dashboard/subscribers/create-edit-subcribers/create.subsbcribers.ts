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
import { SubscribersServices } from '../../../services/subscribers.services';
import { successAlert } from '../../common/alerts/alerts';
import { SubscriberInterface } from '../../../services/interfaces';

@Component({
  selector: 'app-create-subscriber',
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
  templateUrl: './create.subsbcribers.html',
  styleUrls: ['./create.subsbcribers.scss'],
})
export class CreateSubscribersComponent implements OnInit, OnDestroy {
  subscriberForm!: FormGroup;
  mode: 'create' | 'edit' = 'create'; // Mode to differentiate create or edit
  subcriberId: string | null = null; // To store the Subscriber ID for edit mode
  isToggled = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subscribersServices: SubscribersServices,
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    // Initialize the form
    this.subscriberForm = this.fb.group({
      subscriberName: ['', Validators.required],
      subscriberEmail: ['', Validators.required],
    });

    // Check if there's a route parameter (Subscriber ID)
    this.route.paramMap.subscribe((params) => {
      this.subcriberId = params.get('id');
      if (this.subcriberId) {
        this.mode = 'edit'; // Set mode to 'edit' if SubscriberId exists
        this.loadSubcribersData(this.subcriberId); // Load Subscribers data for editing
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup logic if any (currently not used)
  }

  // Load subscribers data into the form for editing
  loadSubcribersData(subscriberId: string): void {
    this.subscribersServices.getSubscriberByUd(subscriberId).subscribe({
      next: (subscriber: SubscriberInterface) => {
        this.subscriberForm.patchValue(subscriber); // Pre-fill the form with Subscriber data
      },
      error: (error: any) => {
        console.error('Error fetching subscriber', error);
        // Optionally, redirect back to the list if the Subscriber isn't found
        // this.router.navigate(['/dasboard/subscribers']);
      },
    });
  }

  onSubmit(): void {
    if (this.subscriberForm.valid) {
      const formData = this.subscriberForm.value;

      if (this.mode === 'create') {
        // Create a new Subscriber
        this.subscribersServices.createSubscriber(formData).subscribe({
          next: (response: any) => {
                successAlert('Subscriber Added Successfully');
                this.router.navigate(['/dashboard/subscribers']);
            console.log('Subscriber created successfully', response);
          },
          error: (error: any) => {
            console.error('Error creating Subscriber', error);
          },
        });
      } else if (this.mode === 'edit' && this.subcriberId) {
        // Update the existing Subscribers
        this.subscribersServices.updateSubscriber(this.subcriberId, formData).subscribe({
          next: (response: any) => {
            successAlert('Subscriber Updated Successfully');
            console.log('Subscriber updated successfully', response);
            // Optionally, navigate back to the Subscribers list or reset the form
            this.router.navigate(['/dashboard/subscribers']);
          },
          error: (error: any) => {
            console.error('Error updating Subscriber', error);
          },
        });
      }
    }
  }

    
 
    
  onCancel(): void {
    // Navigate back to the Subscribers list or reset the form
    this.router.navigate(['/dashboard/subscribers']);
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}