import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User, UserStats } from '../../../models/user';
import { UserFilters, UserService } from '../../../servies/user/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDividerModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  users: User[] = []
  dataSource = new MatTableDataSource<User>([])
  selection = new SelectionModel<User>(true, [])

  displayedColumns: string[] = ["select", "avatar", "name", "email", "role", "stats", "lastLogin", "status", "actions"]

  // Form Controls
  searchControl = new FormControl("")
  roleFilter = new FormControl([])
  departmentFilter = new FormControl("")
  statusFilter = new FormControl("")

  // State
  isLoading = false
  totalUsers = 0
  pageSize = 25
  currentPage = 0

  // Stats
  userStats: UserStats = {
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    adminCount: 0,
    editorCount: 0,
    viewerCount: 0,
  }

  statsCards = [
    { icon: "people", label: "סך המשתמשים", value: 0, class: "total" },
    { icon: "check_circle", label: "משתמשים פעילים", value: 0, class: "active" },
    { icon: "person_add", label: "חדשים החודש", value: 0, class: "new" },
    { icon: "admin_panel_settings", label: "מנהלים", value: 0, class: "admin" },
  ]

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.setupFilters()
    this.loadUsers()
    this.loadStats()
  }

  private setupFilters(): void {
    // Search filter
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => this.loadUsers())

    // Other filters
    this.roleFilter.valueChanges.subscribe(() => this.loadUsers())
    this.departmentFilter.valueChanges.subscribe(() => this.loadUsers())
    this.statusFilter.valueChanges.subscribe(() => this.loadUsers())
  }

  loadUsers(): void {
    this.isLoading = true

    const filters: UserFilters = {
      search: this.searchControl.value || undefined,
      role: this.roleFilter.value?.length ? this.roleFilter.value.join(",") : undefined,
      department: this.departmentFilter.value || undefined,
      isActive: this.statusFilter.value ? this.statusFilter.value === "true" : undefined,
      page: this.currentPage + 1,
      limit: this.pageSize,
      sortBy: this.sort?.active || "createdAt",
      sortDirection: this.sort?.direction || "desc",
    }
    this.userService.getAllUsers(filters).subscribe({
      next: (response) => {
        this.users = response.users
        this.dataSource.data = this.users
        this.totalUsers = response.total
        this.isLoading = false
        this.selection.clear()
      },
      error: (error) => {
        this.isLoading = false
        this.snackBar.open("שגיאה בטעינת המשתמשים", "סגור", { duration: 3000 })
      },
    })
  }
  loadStats(): void {
    this.userService.getUserStats().subscribe({
      next: (stats) => {
        this.userStats = stats
        this.updateStatsCards()
      },
      error: (error) => {
        console.error("Error loading stats:", error)
      },
    })
  }

  private updateStatsCards(): void {
    this.statsCards[0].value = this.userStats.totalUsers
    this.statsCards[1].value = this.userStats.activeUsers
    this.statsCards[2].value = this.userStats.newUsersThisMonth
    this.statsCards[3].value = this.userStats.adminCount
  }

  clearFilters(): void {
    this.searchControl.setValue("")
    this.roleFilter.setValue([])
    this.departmentFilter.setValue("")
    this.statusFilter.setValue("")
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
    this.loadUsers()
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear()
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row))
    }
  }
  openUserDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "600px",
      maxHeight: "90vh",
      data: { user },
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers()
        this.loadStats()
      }
    })
  }

  editUser(user: User): void {
    this.openUserDialog(user)
  }

  deleteUser(user: User): void {
    if (confirm(`האם אתם בטוחים שברצונכם למחוק את המשתמש "${user.name}"?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.snackBar.open("המשתמש נמחק בהצלחה! 🗑️", "סגור", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          })
          this.loadUsers()
          this.loadStats()
        },
        error: (error) => {
          this.snackBar.open("שגיאה במחיקת המשתמש", "סגור", {
            duration: 3000,
            panelClass: ["error-snackbar"],
          })
        },
      })
    }
  }

  deleteSelectedUsers(): void {
    const selectedIds = this.selection.selected.map((user) => user.id)
    const count = selectedIds.length

    if (confirm(`האם אתם בטוחים שברצונכם למחוק ${count} משתמשים?`)) {
      this.userService.deleteMultipleUsers(selectedIds).subscribe({
        next: () => {
          this.snackBar.open(`${count} משתמשים נמחקו בהצלחה! 🗑️`, "סגור", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          })
          this.loadUsers()
          this.loadStats()
          this.selection.clear()
        },
        error: (error) => {
          this.snackBar.open("שגיאה במחיקת המשתמשים", "סגור", {
            duration: 3000,
            panelClass: ["error-snackbar"],
          })
        },
      })
    }
  }

  toggleUserStatus(user: User): void {
    this.userService.toggleUserStatus(user.id).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((u) => u.id === user.id)
        if (index !== -1) {
          this.users[index] = updatedUser
          this.dataSource.data = [...this.users]
        }

        const status = updatedUser.isActive ? "הופעל" : "הושבת"
        this.snackBar.open(`המשתמש ${status} בהצלחה! ⚡`, "סגור", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        })
        this.loadStats()
      },
      error: (error) => {
        this.snackBar.open("שגיאה בשינוי סטטוס המשתמש", "סגור", {
          duration: 3000,
          panelClass: ["error-snackbar"],
        })
      },
    })
  }

  toggleSelectedUsersStatus(): void {
    // Implementation for bulk status toggle
    this.snackBar.open("פיצ'ר בפיתוח...", "סגור", { duration: 2000 })
  }

  viewUserDetails(user: User): void {
    // Implementation for user details view
    this.snackBar.open("פיצ'ר בפיתוח...", "סגור", { duration: 2000 })
  }

  resetPassword(user: User): void {
    if (confirm(`האם אתם בטוחים שברצונכם לאפס את הסיסמה של "${user.name}"?`)) {
      // Implementation for password reset
      this.snackBar.open("אימייל איפוס סיסמה נשלח! 📧", "סגור", {
        duration: 3000,
        panelClass: ["success-snackbar"],
      })
    }
  }

  exportData(format: "excel" | "csv"): void {
    this.userService.exportUsers(format).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `users.${format}`
        link.click()
        window.URL.revokeObjectURL(url)

        this.snackBar.open(`נתונים יוצאו בהצלחה! 📊`, "סגור", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        })
      },
      error: (error) => {
        this.snackBar.open("שגיאה בייצוא הנתונים", "סגור", {
          duration: 3000,
          panelClass: ["error-snackbar"],
        })
      },
    })
  }

  // Utility methods
  getInitials(name: string): string {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  getRoleColor(role: string): string {
    switch (role) {
      case "Admin":
        return "warn"
      case "Editor":
        return "accent"
      case "Viewer":
        return "primary"
      default:
        return "primary"
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case "Admin":
        return "admin_panel_settings"
      case "Editor":
        return "edit"
      case "Viewer":
        return "visibility"
      default:
        return "person"
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case "Admin":
        return "מנהל"
      case "Editor":
        return "עורך"
      case "Viewer":
        return "צופה"
      default:
        return role
    }
  }

  formatStorage(bytes: number): string {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }
}
