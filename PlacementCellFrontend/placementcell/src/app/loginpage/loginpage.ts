import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NotificationServiceTs} from '../service/notification.service.ts.js';
@Component({
  selector: 'app-loginpage',
  standalone:false,
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.less'
})
export class Loginpage {
  constructor(private router: Router, private notifier: NotificationServiceTs) {}

  private username: string = '';
  private password: string = '';
  navigateTo(route: string) {
    if(this.username == "Rishikesh" && this.password == "password123") {
      this.router.navigate([route]);
    }
    else {
      alert("Invalid Credentials");
    }
    this.notifier.show('Data saved successfully!', 'success');
  }
  Submit() {
    this.navigateTo('student/mainpage');
    // Handle login logic here
  }
  onUsernameChange(value: string) {
    this.username = value;
    console.log('Username changed:', value);
  }
  onPasswordChange(value: string) {
    this.password = value;
    console.log('Password changed:', value);
  }
}
