import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { CreateUserModel, UpdateUserModel, User, UserStats } from '../../models/user';

export interface UserFilters {
  search?: string
  role?: string
  isActive?: boolean
  department?: string
  sortBy?: string
  sortDirection?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface PaginatedUsers {
  users: User[]
  total: number
  page: number
  totalPages: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(
    page: number = 1,
    pageSize: number = 10,
    sortField: string = 'lastName',
    sortDirection: string = 'asc',
    filters: any = {}
  ): Observable<{ users: User[], total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);
    
    if (filters.role) {
      params = params.set('role', filters.role);
    }
    
    if (filters.isActive !== '' && filters.isActive !== null && filters.isActive !== undefined) {
      params = params.set('isActive', filters.isActive);
    }
    
    return this.http.get<{ users: User[], total: number }>(this.apiUrl, { params });
    

  }

  
  
  importUsers(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, formData);
  }


getAllUsers(filters?: UserFilters): Observable<PaginatedUsers> {
  return this.http.get<User[]>(this.apiUrl).pipe(
    map((users) => {
      let filteredUsers = [...users]

      if (filters) {
        if (filters.search && filters.search.trim()) {
          const searchTerm = filters.search.toLowerCase().trim()
          filteredUsers = filteredUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm) ||
              (user.department && user.department.toLowerCase().includes(searchTerm)) ||
              (user.phoneNumber && user.phoneNumber.includes(searchTerm)),
          )
        }

        // סינון לפי תפקיד
        if (filters.role && filters.role.length > 0) {
          const roles = Array.isArray(filters.role) ? filters.role : filters.role.split(",")
          filteredUsers = filteredUsers.filter((user) => roles.includes(user.role))
        }

        // סינון לפי מחלקה
        if (filters.department && filters.department.trim()) {
          filteredUsers = filteredUsers.filter((user) => user.department === filters.department)
        }

        // סינון לפי סטטוס
        if (filters.isActive !== undefined) {
          filteredUsers = filteredUsers.filter((user) => user.isActive === filters.isActive)
        }

        // מיון
        if (filters.sortBy) {
          filteredUsers.sort((a, b) => {
            const aValue = a[filters.sortBy as keyof User] as any
            const bValue = b[filters.sortBy as keyof User] as any

            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1

            if (filters.sortDirection === "desc") {
              return bValue > aValue ? 1 : -1
            }
            return aValue > bValue ? 1 : -1
          })
        }
      }

      // Pagination
      const page = filters?.page || 1
      const limit = filters?.limit || 25
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

      return {
        users: paginatedUsers,
        total: filteredUsers.length,
        page: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
      }
    }),
  )
}
getUser(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`)
}

createUser(user: CreateUserModel): Observable<User> {
  return this.http.post<User>(this.apiUrl, user)
}

updateUser(id: number, user: UpdateUserModel): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${id}`, user)
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`)
}

deleteMultipleUsers(ids: number[]): Observable<any> {
  const deleteRequests = ids.map((id) => this.deleteUser(id))
  return forkJoin(deleteRequests)
}

toggleUserStatus(id: number): Observable<User> {
  return this.getUser(id).pipe(
    switchMap((user) => {
      const updatedUser: UpdateUserModel = {
        name: user.name,
        email: user.email,
        roleName: user.role,
        phoneNumber: user.phoneNumber,
        department: user.department,
        isActive: !user.isActive,
      }
      return this.updateUser(id, updatedUser)
    }),
  )
}

getUserStats(): Observable<UserStats> {
  return this.http.get<User[]>(this.apiUrl).pipe(map((users) => this.calculateStats(users)))
}

exportUsers(format: "excel" | "csv"): Observable<Blob> {
  return this.http.get<User[]>(this.apiUrl).pipe(map((users) => this.createExportFile(users, format)))
}



private applyClientSideFilters(users: User[], filters?: UserFilters): PaginatedUsers {
  let filteredUsers = [...users]

  if (filters) {
    // חיפוש טקסט
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          (user.department && user.department.toLowerCase().includes(searchTerm)),
      )
    }

    // סינון לפי תפקיד
    if (filters.role) {
      const roles = filters.role.split(",")
      filteredUsers = filteredUsers.filter((user) => roles.includes(user.role))
    }

    // סינון לפי מחלקה
    if (filters.department) {
      filteredUsers = filteredUsers.filter((user) => user.department === filters.department)
    }

    // סינון לפי סטטוס
    if (filters.isActive !== undefined) {
      filteredUsers = filteredUsers.filter((user) => user.isActive === filters.isActive)
    }

    // מיון
    if (filters.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof User]
        const bValue = b[filters.sortBy as keyof User]

        if (filters.sortDirection === "desc") {
          return (bValue ?? '') > (aValue ?? '') ? 1 : -1
        }
        return (bValue ?? '') > (aValue ?? '') ? 1 : -1
      })
    }
  }


  // Pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 25
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    page: page,
    totalPages: Math.ceil(filteredUsers.length / limit),
  }
}

private calculateStats(users: User[]): UserStats {
  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.isActive).length,
    newUsersThisMonth: users.filter((u) => new Date(u.createdAt) >= thisMonth).length,
    adminCount: users.filter((u) => u.role === "Admin").length,
    editorCount: users.filter((u) => u.role === "Editor").length,
    viewerCount: users.filter((u) => u.role === "Viewer").length,
  }
}

private createExportFile(users: User[], format: "excel" | "csv"): Blob {
  if (format === "csv") {
    const headers = ["ID", "Name", "Email", "Role", "Department", "Active", "Created At"]
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [
          user.id,
          `"${user.name}"`,
          user.email,
          user.role,
          user.department || "",
          user.isActive ? "Yes" : "No",
          new Date(user.createdAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  }

  // For Excel, we'll create a simple HTML table that Excel can open
  const htmlContent = `
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Department</th>
        <th>Active</th>
        <th>Created At</th>
      </tr>
      ${users
        .map(
          (user) => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${user.department || ""}</td>
          <td>${user.isActive ? "Yes" : "No"}</td>
          <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        </tr>
      `,
        )
        .join("")}
    </table>
  `

  return new Blob([htmlContent], { type: "application/vnd.ms-excel" })
}

}


