import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServices } from '../../../services/auth.services';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']  // Corrected `styleUrl` to `styleUrls`
})
export class SignInComponent {
  authForm: FormGroup;
  hide = true;
  loginError: string | null = null;  // To store login error messages

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public themeService: CustomizerSettingsService,
    private authService: AuthServices
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  isToggled = false;

  onSubmit() {
    if (this.authForm.valid) {
      const credentials = {
        userEmail: this.authForm.value.email,
        password: this.authForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('username', response.userName);  // If necessary
          localStorage.setItem('userRole', response.userRole);  // If necessary
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userImage', response.userImageUrl);
          // Optionally fetch user info right after login
          this.authService.getUserInfo().subscribe({
            next: (userInfo) => {
                  console.log('User info retrieved', userInfo);
                  this.router.navigate(['/dashboard']); 
             
            },
            error: (error) => {
              console.error('Failed to fetch user info', error);
              this.loginError = 'Failed to fetch user information.';
            }
          });
        },
        error: (error) => {
          console.error('Login failed', error);
          this.loginError = 'Incorrect email or password';  // Show error message
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
