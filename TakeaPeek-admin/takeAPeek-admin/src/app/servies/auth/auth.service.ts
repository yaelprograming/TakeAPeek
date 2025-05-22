import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly apiUrl = 'http://localhost:5293/auth/login'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<{ token: string }>(this.apiUrl, body).pipe(
      tap((response) => {
        console.log('response from server:', response); // <<< חשוב!
        if (!response.token) {
          throw new Error('לא הוחזר טוקן מהשרת');
        }
        const user = this.decodeToken(response.token);
        const authResult = {
          token: response.token,
          user
        };
        this.setSession(authResult);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setSession(authResult: any): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); // בסיס 64
    const claims = JSON.parse(decodedPayload);

    return {
      email: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  }
}
