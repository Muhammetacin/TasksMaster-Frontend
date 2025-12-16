import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './models/auth.models';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  // Pas de URL aan naar jouw backend API endpoint
  private apiUrl = 'https://localhost:7237/Auth';
  private readonly TOKEN_KEY = 'auth_token';

  // --- Token Beheer ---
  public getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null; // Server-side rendering, no localStorage
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private saveToken(token: string): void {
    if (typeof localStorage === 'undefined') {
      return; // Server-side rendering, can't save token
    }
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    // Controleren of de token bestaat
    return !!this.getToken();
  }

  public logout(): void {
    if (typeof localStorage === 'undefined') {
      return; // Server-side rendering
    }
    localStorage.removeItem(this.TOKEN_KEY);
    // TODO: Navigeren naar de login pagina
  }


  // --- API Interactie ---
  public login(request: LoginRequest): Observable<LoginResponse> {
    console.log('AuthService.login() called with:', request);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response.token) {
          console.log('Saving token to localStorage:', response.token);
          this.saveToken(response.token);
        }
      }),
      catchError(error => {
        console.error('Login HTTP error:', error);
        return throwError(() => error);
      })
    );
  }
}
