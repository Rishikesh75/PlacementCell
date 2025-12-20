import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../core/constants/app.constants';
import {User} from '../../domain/entities/user.entity'
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
  getUserByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }
}

