import { Component,  OnInit } from "@angular/core"
import  { UserService } from "../../services/user.service"
import  { User } from "../../models/user.model"

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  users: User[] = []
  isLoading = true
  showUserForm = false
  selectedUser: User | null = null

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.isLoading = true
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading users", error)
        this.isLoading = false
      },
    })
  }

  openUserForm(user: User | null = null): void {
    this.selectedUser = user
    this.showUserForm = true
  }

  closeUserForm(): void {
    this.showUserForm = false
    this.selectedUser = null
  }

  saveUser(user: User): void {
    if (user.id) {
      this.userService.updateUser(user).subscribe({
        next: () => {
          this.loadUsers()
          this.closeUserForm()
        },
        error: (error) => {
          console.error("Error updating user", error)
        },
      })
    } else {
      this.userService.createUser(user).subscribe({
        next: () => {
          this.loadUsers()
          this.closeUserForm()
        },
        error: (error) => {
          console.error("Error creating user", error)
        },
      })
    }
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers()
        },
        error: (error) => {
          console.error("Error deleting user", error)
        },
      })
    }
  }
}
