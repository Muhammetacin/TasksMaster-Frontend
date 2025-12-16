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
  // Pas de URL aan naar jouw backend API endpoint
  private apiUrl = 'https://localhost:7237/Auth';
  private readonly TOKEN_KEY = 'auth_token';

  // --- Token Beheer ---
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    // Controleren of de token bestaat
    return !!this.getToken();
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Navigeren naar de login pagina
    const router = inject(Router);
    router.navigate(['/login']);
  }


  // --- API Interactie ---
  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => response.token && this.saveToken(response.token)),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }
}
