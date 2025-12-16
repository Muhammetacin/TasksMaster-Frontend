import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth';

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
