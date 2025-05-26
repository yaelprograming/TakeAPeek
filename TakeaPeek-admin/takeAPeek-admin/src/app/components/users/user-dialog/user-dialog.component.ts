import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateUserModel, UpdateUserModel, User } from '../../../models/user';
import { UserService } from '../../../servies/user/user.service';

@Component({
  selector: 'app-user-dialog',
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup
  hidePassword = true
  isLoading = false
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User }
  ) {
    this.isEditMode = !!data?.user;
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.user) {
      this.populateForm(this.data.user)
    }
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      roleName: ["", Validators.required],
      phoneNumber: [""],
      department: [""],
    })

    if (!this.isEditMode) {
      (form as FormGroup<any>).addControl("password", this.fb.control("", [Validators.required, Validators.minLength(6)]))
    } else {
      (form as FormGroup<any>).addControl("isActive", this.fb.control(true))
    }

    return form
  }

  private populateForm(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      roleName: user.role,
      phoneNumber: user.phoneNumber || "",
      department: user.department || "",
      isActive: user.isActive,
    })
  }

  save(): void {
    if (this.userForm.valid) {
      this.isLoading = true

      if (this.isEditMode) {
        const updateData: UpdateUserModel = {
          name: this.userForm.value.name,
          email: this.userForm.value.email,
          roleName: this.userForm.value.roleName,
          phoneNumber: this.userForm.value.phoneNumber,
          department: this.userForm.value.department,
          isActive: this.userForm.value.isActive,
        }

        this.userService.updateUser(this.data.user!.id, updateData).subscribe({
          next: (user) => {
            this.isLoading = false
            this.snackBar.open("המשתמש עודכן בהצלחה! 🎉", "סגור", {
              duration: 3000,
              panelClass: ["success-snackbar"],
            })
            this.dialogRef.close(user)
          },
          error: (error) => {
            this.isLoading = false
            this.snackBar.open("שגיאה בעדכון המשתמש", "סגור", {
              duration: 3000,
              panelClass: ["error-snackbar"],
            })
          },
        })
      } else {
        const createData: CreateUserModel = {
          name: this.userForm.value.name,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          roleName: this.userForm.value.roleName,
          phoneNumber: this.userForm.value.phoneNumber,
          department: this.userForm.value.department,
        }

        this.userService.createUser(createData).subscribe({
          next: (user) => {
            this.isLoading = false
            this.snackBar.open("המשתמש נוצר בהצלחה! 🎉", "סגור", {
              duration: 3000,
              panelClass: ["success-snackbar"],
            })
            this.dialogRef.close(user)
          },
          error: (error) => {
            this.isLoading = false
            this.snackBar.open("שגיאה ביצירת המשתמש", "סגור", {
              duration: 3000,
              panelClass: ["error-snackbar"],
            })
          },
        })
      }
    }
  }
}
