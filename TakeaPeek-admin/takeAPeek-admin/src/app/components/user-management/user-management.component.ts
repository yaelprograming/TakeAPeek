// // import { Component, OnDestroy, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup } from '@angular/forms';
// // import { Subject, takeUntil } from 'rxjs';
// // import { UserService } from '../../servies/user.service';
// // import { User } from '../../models/user';

// // @Component({
// //   selector: 'app-user-management',
// //   imports: [],
// //   templateUrl: './user-management.component.html',
// //   styleUrl: './user-management.component.css'
// // })
// // export class UserManagementComponent implements OnInit, OnDestroy{
// //   users: User[] = [];
// //   filteredUsers: User[] = [];
// //   isLoading = true;
// //   showUserForm = false;
// //   selectedUser: User | null = null;
// //   searchTerm = '';

// //   // פרמטרים לדפדוף
// //   currentPage = 1;
// //   pageSize = 10;
// //   totalUsers = 0;
  
// //   // מיון
// //   sortField = 'lastName';
// //   sortDirection = 'asc';
  
// //   // סינון
// //   filterForm: FormGroup;
  
// //   private destroy$ = new Subject<void>();

// //   constructor(
// //     private userService: UserService,
// //     private fb: FormBuilder
// //   ) {
// //     this.filterForm = this.fb.group({
// //       role: [''],
// //       isActive: ['']
// //     });
// //   }

// //   ngOnInit(): void {
// //     this.loadUsers();
    
// //     // האזנה לשינויים בטופס הסינון
// //     this.filterForm.valueChanges
// //       .pipe(takeUntil(this.destroy$))
// //       .subscribe(() => {
// //         this.applyFilters();
// //       });
// //   }
  
// //   ngOnDestroy(): void {
// //     this.destroy$.next();
// //     this.destroy$.complete();
// //   }

// //   loadUsers(): void {
// //     this.isLoading = true;
    
// //     this.userService.getUsers(
// //       this.currentPage,
// //       this.pageSize,
// //       this.sortField,
// //       this.sortDirection,
// //       this.filterForm.value
// //     )
// //     .pipe(takeUntil(this.destroy$))
// //     .subscribe({
// //       next: (response:any) => {
// //         this.users = response.users;
// //         this.filteredUsers = [...this.users];
// //         this.totalUsers = response.total;
// //         this.isLoading = false;
        
// //         // החל סינון אם יש מונח חיפוש
// //         if (this.searchTerm) {
// //           this.onSearch(this.searchTerm);
// //         }
// //       },
// //       error: (error:any) => {
// //         console.error('Error loading users', error);
// //         this.isLoading = false;
// //       }
// //     });
// //   }

// //   openUserForm(user: User | null = null): void {
// //     this.selectedUser = user ? { ...user } : null;
// //     this.showUserForm = true;
// //   }

// //   closeUserForm(): void {
// //     this.showUserForm = false;
// //     this.selectedUser = null;
// //   }

// //   saveUser(user: User): void {
// //     this.isLoading = true;
    
// //     if (user.id) {
// //       this.userService.updateUser(user)
// //         .pipe(takeUntil(this.destroy$))
// //         .subscribe({
// //           next: () => {
// //             this.loadUsers();
// //             this.closeUserForm();
// //           },
// //           error: (error:any) => {
// //             console.error('Error updating user', error);
// //             this.isLoading = false;
// //           }
// //         });
// //     } else {
// //       this.userService.createUser(user)
// //         .pipe(takeUntil(this.destroy$))
// //         .subscribe({
// //           next: () => {
// //             this.loadUsers();
// //             this.closeUserForm();
// //           },
// //           error: (error:any) => {
// //             console.error('Error creating user', error);
// //             this.isLoading = false;
// //           }
// //         });
// //     }
// //   }

// //   deleteUser(id: number): void {
// //     if (confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
// //       this.isLoading = true;
      
// //       this.userService.deleteUser(id)
// //         .pipe(takeUntil(this.destroy$))
// //         .subscribe({
// //           next: () => {
// //             this.loadUsers();
// //           },
// //           error: (error:any) => {
// //             console.error('Error deleting user', error);
// //             this.isLoading = false;
// //           }
// //         });
// //     }
// //   }
  
// //   onSearch(term: string): void {
// //     this.searchTerm = term.toLowerCase();
    
// //     if (!this.searchTerm) {
// //       this.filteredUsers = [...this.users];
// //       return;
// //     }
    
// //     this.filteredUsers = this.users.filter(user => 
// //       user.name.toLowerCase().includes(this.searchTerm) ||
// //       user.email.toLowerCase().includes(this.searchTerm)
// //     );
// //   }
  
// //   applyFilters(): void {
// //     // אפשר לבצע סינון מקומי או לטעון מחדש מהשרת
// //     this.loadUsers();
// //   }
  
// //   onPageChange(page: number): void {
// //     this.currentPage = page;
// //     this.loadUsers();
// //   }
  
// //   onSort(field: string): void {
// //     // אם לוחצים על אותו שדה, הפוך את כיוון המיון
// //     if (this.sortField === field) {
// //       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
// //     } else {
// //       this.sortField = field;
// //       this.sortDirection = 'asc';
// //     }
    
// //     this.loadUsers();
// //   }
  
// //   getSortIcon(field: string): string {
// //     if (this.sortField !== field) {
// //       return 'icon-arrow-up-down';
// //     }
    
// //     return this.sortDirection === 'asc' ? 'icon-arrow-up' : 'icon-arrow-down';
// //   }
  
// //   resetFilters(): void {
// //     this.filterForm.reset({
// //       role: '',
// //       isActive: ''
// //     });
    
// //     this.searchTerm = '';
// //     this.currentPage = 1;
// //     this.loadUsers();
// //   }
  
// //   // פונקציות עזר לדפדוף
// //   get totalPages(): number {
// //     return Math.ceil(this.totalUsers / this.pageSize);
// //   }
  
// //   get pages(): number[] {
// //     const pagesArray = [];
// //     const maxPagesToShow = 5;
    
// //     let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
// //     let endPage = startPage + maxPagesToShow - 1;
    
// //     if (endPage > this.totalPages) {
// //       endPage = this.totalPages;
// //       startPage = Math.max(1, endPage - maxPagesToShow + 1);
// //     }
    
// //     for (let i = startPage; i <= endPage; i++) {
// //       pagesArray.push(i);
// //     }
    
// //     return pagesArray;
// //   }
  
// //   // פונקציות לניהול הרשאות
// //   toggleUserStatus(user: User): void {
// //     const updatedUser = { ...user, isActive: !user.isActive };
    
// //     this.userService.updateUser(updatedUser)
// //       .pipe(takeUntil(this.destroy$))
// //       .subscribe({
// //         next: () => {
// //           // עדכון המשתמש ברשימה המקומית
// //           const index = this.users.findIndex(u => u.id === user.id);
// //           if (index !== -1) {
// //             this.users[index] = updatedUser;
// //             this.filteredUsers = [...this.users];
            
// //             // החל סינון אם יש מונח חיפוש
// //             if (this.searchTerm) {
// //               this.onSearch(this.searchTerm);
// //             }
// //           }
// //         },
// //         error: (error:any) => {
// //           console.error('Error updating user status', error);
// //         }
// //       });
// //   }
  
// //   // ייצוא משתמשים ל-CSV
// //   exportUsers(): void {
// //     this.userService.exportUsers()
// //       .pipe(takeUntil(this.destroy$))
// //       .subscribe({
// //         next: (blob) => {
// //           const url = window.URL.createObjectURL(blob);
// //           const a = document.createElement('a');
// //           a.href = url;
// //           a.download = 'users.csv';
// //           document.body.appendChild(a);
// //           a.click();
// //           window.URL.revokeObjectURL(url);
// //           document.body.removeChild(a);
// //         },
// //         error: (error:any) => {
// //           console.error('Error exporting users', error);
// //         }
// //       });
// //   }
  
// //   // ייבוא משתמשים מ-CSV
// //   importUsers(event: Event): void {
// //     const input = event.target as HTMLInputElement;
    
// //     if (!input.files?.length) {
// //       return;
// //     }
    
// //     const file = input.files[0];
// //     const formData = new FormData();
// //     formData.append('file', file);
    
// //     this.isLoading = true;
    
// //     this.userService.importUsers(formData)
// //       .pipe(takeUntil(this.destroy$))
// //       .subscribe({
// //         next: () => {
// //           this.loadUsers();
// //           // איפוס שדה הקובץ
// //           input.value = '';
// //         },
// //         error: (error:any) => {
// //           console.error('Error importing users', error);
// //           this.isLoading = false;
// //           // איפוס שדה הקובץ
// //           input.value = '';
// //         }
// //       });
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { User } from '../../models/user';
// import { UserService } from '../../servies/user.service';
// import { PageEvent } from '@angular/material/paginator';


// @Component({
//   selector: 'app-user-management',
//   templateUrl: './user-management.component.html',
//   styleUrls: ['./user-management.component.scss']
// })
// export class UserManagementComponent implements OnInit {
//   users: User[] = [];
//   totalUsers = 0;
//   page = 1;
//   pageSize = 10;
//   sortField = 'lastName';
//   sortDirection = 'asc';
//   filters = {
//     role: '',
//     isActive: ''
//   };

//   displayedColumns: string[] = ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'actions'];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.userService.getUsers(this.page, this.pageSize, this.sortField, this.sortDirection, this.filters)
//       .subscribe((response: { users: User[]; total: number }) => {
//         this.users = response.users;
//         this.totalUsers = response.total;
//       });
//   }

//   onSort(field: string): void {
//     if (this.sortField === field) {
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sortField = field;
//       this.sortDirection = 'asc';
//     }
//     this.loadUsers();
//   }

//   onPageChange(event: PageEvent): void {
//     this.page = event.pageIndex + 1;
//     this.pageSize = event.pageSize;
//     this.loadUsers();
//   }

//   onFilterChange(): void {
//     this.page = 1;
//     this.loadUsers();
//   }

//   exportUsers(): void {
//     this.userService.exportUsers().subscribe((blob: Blob) => {
//       const a = document.createElement('a');
//       const objectUrl = URL.createObjectURL(blob);
//       a.href = objectUrl;
//       a.download = 'users.csv';
//       a.click();
//       URL.revokeObjectURL(objectUrl);
//     });
//   }

//   importUsers(event: any): void {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     this.userService.importUsers(formData).subscribe(() => {
//       this.loadUsers();
//     });
//   }

//   deleteUser(id: number): void {
//     this.userService.deleteUser(id).subscribe(() => {
//       this.loadUsers();
//     });
//   }

//   editUser(user: User): void {
//     // פה תוכל לפתוח דיאלוג/טופס עריכה
//     console.log('עריכת משתמש:', user);
//   }
// }
