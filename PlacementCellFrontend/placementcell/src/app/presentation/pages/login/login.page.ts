import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationType } from '../../../core/enums/notification.enum';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrl: './login.page.less'
})
export class LoginPage {
  private username: string = '';
  private password: string = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  navigateTo(route: string): void {
    if (this.username === 'Rishikesh' && this.password === 'password123') {
      this.router.navigate([route]);
    } else {
      this.notificationService.show('Invalid Credentials', NotificationType.ERROR);
    }
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

