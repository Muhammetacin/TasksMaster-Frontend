import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './models/auth.models';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  // Pas de URL aan naar jouw backend API endpoint
  private apiUrl = 'https://localhost:7237/Auth';
  private readonly TOKEN_KEY = 'auth_token';

  // --- Token Beheer ---
  public getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      console.log('getToken() - localStorage is undefined (SSR)');
      return null; // Server-side rendering, no localStorage
    }
    const token = localStorage.getItem(this.TOKEN_KEY);
    // console.log('getToken() - localStorage value:', token);
    return token;
  }

  private saveToken(token: string): void {
    if (typeof localStorage === 'undefined') {
      return; // Server-side rendering, can't save token
    }
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    // Controleren of de token bestaat
    // console.log('AuthService.isLoggedIn() called. Token:', this.getToken());
    return !!this.getToken();
  }

  public logout(): void {
    if (typeof localStorage === 'undefined') {
      return; // Server-side rendering
    }
    localStorage.removeItem(this.TOKEN_KEY);
    // Navigeren naar de login pagina
    this.router.navigate(['/login']);
  }


  // --- API Interactie ---
  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        if (response.token) {
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
