import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main.page.html',
  styleUrl: './main.page.less'
})
export class MainPage {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }
}

