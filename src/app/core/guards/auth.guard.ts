import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Gebruiker mag door
  } else {
    // Niet ingelogd? Stuur naar login
    router.navigate(['/login']);
    return false;
  }
};
