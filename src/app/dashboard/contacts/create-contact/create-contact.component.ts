import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ELEMENT_DATA } from '../contact-data';


@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxEditorModule,
  ],
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
})
export class CreateContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  mode: 'create' | 'edit' = 'create';
  contactId: string | null = null;

  // Text Editor
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.mode = 'edit';
      this.loadContactData(this.contactId);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      status: ['', Validators.required],
      img: ['']
    });
  }

  loadContactData(contactId: string): void {
    const contact = ELEMENT_DATA.find(item => item.contactID === contactId);
    if (contact) {
      this.contactForm.patchValue({
        name: contact.customer.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        status: contact.status.active ? 'Active' : 'Deactive',
        img: contact.customer.img,
      });
    }
  }

  saveContact(): void {
    if (this.mode === 'edit') {
      // Logic to update the contact
      console.log('Contact updated:', this.contactForm.value);
    } else {
      // Logic to create a new contact
      console.log('New contact created:', this.contactForm.value);
    }
  }

  public multiple: boolean = false;
  isToggled = false;

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
