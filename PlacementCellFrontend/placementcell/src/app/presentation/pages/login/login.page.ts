import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationType } from '../../../core/enums/notification.enum';
import { UserApiService } from '../../../infrastructure/api/user-api.service';
import {User} from '../../../domain/entities/user.entity'

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrl: '../../../styles/pages/login.less'
})
export class LoginPage implements OnInit {
  private username: string = '';
  private password: string = '';
  private isLoading: boolean = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    // No need to fetch users on initialization
  }

  /**
   * Navigate to a route if credentials are valid
   * @param route - Route to navigate to
   */
  navigateTo(route: string): void {
    if (!this.username || !this.password) {
      this.notificationService.show('Please enter username and password', NotificationType.ERROR);
      return;
    }

    if (this.isLoading) {
      this.notificationService.show('Please wait...', NotificationType.ERROR);
      return;
    }

    // Fetch user by username and validate credentials
    this.isLoading = true;
    this.userApiService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        this.isLoading = false;
        
        if (user && user.password === this.password) {
          // Store user data in localStorage for authentication
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.notificationService.show('Login successful!', NotificationType.SUCCESS);
          this.router.navigate([route]);
        } else {
          this.notificationService.show('User not found or invalid credentials', NotificationType.ERROR);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching user:', error);
        this.notificationService.show('Error during login. Please try again.', NotificationType.ERROR);
      }
    });
  }

  onSubmit(): void {
    this.navigateTo('student/mainpage');
  }

  onUsernameChange(value: string): void {
    this.username = value;
    console.log('Username changed:', value);
  }

  onPasswordChange(value: string): void {
    this.password = value;
    console.log('Password changed:', value);
  }
}

