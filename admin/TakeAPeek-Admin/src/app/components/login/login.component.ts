import { Component, OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isSubmitting = false
  errorMessage = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"])
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isSubmitting = true
    this.errorMessage = ""

    const { email, password } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        this.errorMessage = error.message || "Invalid credentials"
        this.isSubmitting = false
      },
    })
  }
}
