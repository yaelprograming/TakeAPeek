import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-system-settings",
  templateUrl: "./system-settings.component.html",
  styleUrls: ["./system-settings.component.scss"],
})
export class SystemSettingsComponent implements OnInit {
  generalSettingsForm: FormGroup
  notificationSettingsForm: FormGroup
  securitySettingsForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.generalSettingsForm = this.fb.group({
      siteName: ["Photo Admin", [Validators.required]],
      siteDescription: ["Admin dashboard for photo management system", [Validators.required]],
      language: ["en", [Validators.required]],
      timezone: ["UTC", [Validators.required]],
    })

    this.notificationSettingsForm = this.fb.group({
      emailNotifications: [true],
      systemAlerts: [true],
      userActivityAlerts: [false],
      securityAlerts: [true],
    })

    this.securitySettingsForm = this.fb.group({
      twoFactorAuth: [false],
      sessionTimeout: [30, [Validators.required, Validators.min(5), Validators.max(120)]],
      passwordExpiry: [90, [Validators.required, Validators.min(30), Validators.max(365)]],
      loginAttempts: [5, [Validators.required, Validators.min(3), Validators.max(10)]],
    })
  }

  ngOnInit(): void {}

  saveGeneralSettings(): void {
    if (this.generalSettingsForm.invalid) {
      return
    }

    console.log("General settings saved:", this.generalSettingsForm.value)
    // Here you would call a service to save the settings
  }

  saveNotificationSettings(): void {
    if (this.notificationSettingsForm.invalid) {
      return
    }

    console.log("Notification settings saved:", this.notificationSettingsForm.value)
    // Here you would call a service to save the settings
  }

  saveSecuritySettings(): void {
    if (this.securitySettingsForm.invalid) {
      return
    }

    console.log("Security settings saved:", this.securitySettingsForm.value)
    // Here you would call a service to save the settings
  }
}
