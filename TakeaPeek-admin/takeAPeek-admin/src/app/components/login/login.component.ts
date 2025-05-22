import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servies/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../../dashboard/dashboard/dashboard.component';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule,DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // אם המשתמש כבר מחובר, הפנה לדשבורד
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('עובר לדשבורד-התחברות הצליחה'); // <<< בדיקה
        console.log(res)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('שגיאת התחברות:', error); // <<< בדיקה
        this.errorMessage = error.message || 'פרטי התחברות שגויים';
        this.isSubmitting = false;
      }
    });
  }
}