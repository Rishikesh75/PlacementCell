/**
 * Authentication Guard
 * Protects routes that require authentication
 */

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { APP_CONSTANTS } from '../constants';

/**
 * Guard function to check if user is authenticated
 * Usage: Add to route configuration
 * 
 * Example:
 * {
 *   path: 'student/mainpage',
 *   component: MainPageComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // TODO: Replace with actual authentication check
  // This is a placeholder implementation
  const isAuthenticated = checkAuthentication();
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    router.navigate([APP_CONSTANTS.ROUTES.STUDENT.LOGIN]);
    return false;
  }
  
  return true;
};

/**
 * Check if user is authenticated
 * TODO: Implement actual authentication check
 * - Check for valid JWT token in localStorage/sessionStorage
 * - Verify token expiration
 * - Call authentication service
 */
function checkAuthentication(): boolean {
  // Placeholder: Check if user data exists in localStorage
  const userData = localStorage.getItem('currentUser');
  return userData !== null;
}

/**
 * Guard function to check if user is already logged in
 * Redirects to main page if already authenticated
 * 
 * Usage: Add to login route to prevent accessing login page when already logged in
 * 
 * Example:
 * {
 *   path: 'student/login',
 *   component: LoginPageComponent,
 *   canActivate: [guestGuard]
 * }
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const isAuthenticated = checkAuthentication();
  
  if (isAuthenticated) {
    // Redirect to main page if already authenticated
    router.navigate([APP_CONSTANTS.ROUTES.STUDENT.MAIN_PAGE]);
    return false;
  }
  
  return true;
};

