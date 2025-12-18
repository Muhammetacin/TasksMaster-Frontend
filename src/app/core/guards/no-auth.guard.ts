import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  console.log('NoAuthGuard - Checking if user is already logged in...');

  // Skip check on server-side rendering
  if (!isPlatformBrowser(platformId)) {
    console.log('NoAuthGuard - Running on server, allowing route (SSR)');
    return true;
  }

  const isLoggedIn = authService.isLoggedIn();
  console.log('NoAuthGuard - isLoggedIn:', isLoggedIn);

  if (isLoggedIn) {
    console.log('NoAuthGuard - User already logged in, redirecting to /tasks');
    router.navigate(['/tasks']);
    return false;
  }

  console.log('NoAuthGuard - User not logged in, allowing access to login page');
  return true;
};
