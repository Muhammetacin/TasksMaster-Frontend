import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  console.log('AuthGuard - Checking authentication...');

  // Skip auth check on server-side rendering
  if (!isPlatformBrowser(platformId)) {
    console.log('AuthGuard - Running on server, allowing route (SSR)');
    return true;
  }

  const token = authService.getToken();
  const isLoggedIn = authService.isLoggedIn();
  
  console.log('AuthGuard - Token:', token);
  console.log('AuthGuard - isLoggedIn:', isLoggedIn);

  if (isLoggedIn) {
    console.log('AuthGuard - Access GRANTED to:', state.url);
    return true;
  } else {
    console.log('AuthGuard - Access DENIED, redirecting to /login');
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
