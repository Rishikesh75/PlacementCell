import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone:false,
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.less'
})
export class Mainpage {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
