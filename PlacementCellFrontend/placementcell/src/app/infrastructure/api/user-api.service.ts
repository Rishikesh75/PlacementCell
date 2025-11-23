import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_CONSTANTS } from '../../core/constants/app.constants';
import {User} from '../../domain/interfaces/User.interface'
/**
 * User data interface
 */


/**
 * User API Service
 * Handles all user-related API calls
 */
@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly apiUrl = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.STUDENTS}`;

  constructor(private http: HttpClient) {}

  /**
   * Get all users/students from the API
   * @returns Observable of users array
   */
  getAllUsers(): Observable<User[]> {
    
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Get user by username
   * @param username - The username to search for
   * @returns Observable of user or null
   */
  getUserByUsername(username: string): Observable<User | null> {
    console.log('🔍 getUserByUsername called with username:', username);
    const url = `${this.apiUrl}/${username}`;
    console.log('📡 API URL:', url);
    
    return this.http.get<User | null>(url).pipe(
      tap({
        next: (response) => {
          console.log('✅ getUserByUsername SUCCESS Response:', response);
          console.log('📊 Response Type:', typeof response);
          console.log('📋 Response Details:', JSON.stringify(response, null, 2));
        },
        error: (error) => {
          console.error('❌ getUserByUsername ERROR:', error);
          console.error('🔥 Error Status:', error.status);
          console.error('🔥 Error Message:', error.message);
        }
      })
    );
  }
}

