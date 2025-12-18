import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, 
    ReactiveFormsModule, 
    InputTextModule, 
    ButtonModule, 
    MessageModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  // messageService = inject(MessageService);
  authService = inject(AuthService);
  router = inject(Router);

  exampleForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
      this.exampleForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit() {
      this.formSubmitted = true;
      if (this.exampleForm.valid) {
        this.authService.login({
          email: this.exampleForm.value.email,
          password: this.exampleForm.value.password
        }).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Login failed:', error);
          }
        });
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
          this.exampleForm.reset();
          this.formSubmitted = false;
      }
  }

  isInvalid(controlName: string) {
      const control = this.exampleForm.get(controlName);
      return control?.invalid && (control.touched || this.formSubmitted);
  }
}
