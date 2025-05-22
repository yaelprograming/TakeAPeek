import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of, throwError } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "auth_token"
  private readonly USER_KEY = "auth_user"

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // In a real application, this would make an HTTP request to your API
    // For demo purposes, we'll simulate a successful login with mock data

    if (email === "admin@example.com" && password === "password") {
      const mockResponse = {
        token: "mock-jwt-token",
        user: {
          id: 1,
          email: email,
          firstName: "Admin",
          lastName: "User",
          role: "admin",
        },
      }

      this.setSession(mockResponse)
      return of(mockResponse)
    }

    return throwError(() => new Error("Invalid email or password"))
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getUser(): any {
    const userJson = localStorage.getItem(this.USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  }

  private setSession(authResult: any): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user))
  }
}
