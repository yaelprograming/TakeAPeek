import { Component, EventEmitter, Input,  OnInit, Output } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { User } from "../../models/user.model"

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<User>()

  userForm: FormGroup
  formTitle = "Add User"

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      role: ["user", [Validators.required]],
      isActive: [true],
      avatar: [""],
    })
  }

  ngOnInit(): void {
    if (this.user) {
      this.formTitle = "Edit User"
      this.userForm.patchValue(this.user)
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return
    }

    this.save.emit(this.userForm.value)
  }

  onClose(): void {
    this.close.emit()
  }
}
