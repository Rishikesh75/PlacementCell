import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  standalone:false,
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.less'
})
export class Loginpage {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  Submit() {

    this.navigateTo('student/mainpage');
    // Handle login logic here
  }
}
