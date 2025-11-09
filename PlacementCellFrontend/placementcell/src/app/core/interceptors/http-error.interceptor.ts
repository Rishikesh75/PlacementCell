/**
 * HTTP Error Interceptor
 * Handles HTTP errors globally and provides user feedback
 */

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services';

/**
 * HTTP Error Interceptor Function
 * Intercepts all HTTP errors and handles them appropriately
 * 
 * Usage: Add to providers in app.config.ts
 * provideHttpClient(withInterceptors([httpErrorInterceptor]))
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'No internet connection. Please check your network.';
            break;
          case 400:
            errorMessage = error.error?.message || 'Bad request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please login again.';
            // TODO: Redirect to login page
            break;
          case 403:
            errorMessage = 'Access forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service unavailable. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error: ${error.status} - ${error.statusText}`;
        }
      }

      // Show error notification to user
      notificationService.error(errorMessage);

      // Log error to console for debugging
      console.error('HTTP Error:', {
        status: error.status,
        statusText: error.statusText,
        message: errorMessage,
        url: error.url,
        error: error.error
      });

      // Re-throw the error so components can handle it if needed
      return throwError(() => error);
    })
  );
};

/**
 * Logging Interceptor
 * Logs all HTTP requests and responses for debugging
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  
  console.log('HTTP Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  return next(req).pipe(
    catchError((error) => {
      const duration = Date.now() - startTime;
      console.error('HTTP Error Response:', {
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        error
      });
      return throwError(() => error);
    })
  );
};

