// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })


// export class UserService {

//   constructor(private http: HttpClient) { }

//   getAllUsers(): Observable<any[]> {
//     return this.http.get<any[]>(`${environment.apiUrl}/users`);
//   }

//   getUser(id: number): Observable<any> {
//     return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
//   }

//   createUser(userData: any): Observable<any> {
//     return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData);
//   }

//   updateUser(id: number, userData: any): Observable<any> {
//     return this.http.put<any>(`${environment.apiUrl}/users/${id}`, userData);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
//   }
// }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // פונקציה מותאמת לקריאה מ-UserManagementComponent
  getUsers(
    page: number = 1,
    pageSize: number = 10,
    sortField: string = 'lastName',
    sortDirection: string = 'asc',
    filters: any = {}
  ): Observable<{ users: User[], total: number }> {
    // בניית פרמטרים לשאילתה
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);
    
    // הוספת פרמטרים לסינון
    if (filters.role) {
      params = params.set('role', filters.role);
    }
    
    if (filters.isActive !== '' && filters.isActive !== null && filters.isActive !== undefined) {
      params = params.set('isActive', filters.isActive);
    }
    
    // אם השרת לא תומך בדפדוף/מיון/סינון, אפשר להשתמש בפונקציה הבסיסית ולטפל בלוגיקה בצד הלקוח
    return this.http.get<{ users: User[], total: number }>(this.apiUrl, { params });
    
    // אלטרנטיבה אם השרת לא מחזיר את המבנה הנדרש:
    // return this.getAllUsers().pipe(
    //   map(users => {
    //     // כאן תוכל לבצע סינון, מיון ודפדוף בצד הלקוח
    //     return { users: users.slice((page-1)*pageSize, page*pageSize), total: users.length };
    //   })
    // );
  }

  // הפונקציות המקוריות
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userData.id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // פונקציות נוספות שנדרשות על ידי UserManagementComponent
  exportUsers(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      responseType: 'blob'
    });
  }
  
  importUsers(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, formData);
  }
}