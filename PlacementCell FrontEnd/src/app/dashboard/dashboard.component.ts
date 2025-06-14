import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  isadmin: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get query params
    this.route.queryParams.subscribe(params => {
      this.isadmin = params['admin'] === 'true';
      console.log('Is Admin:', this.isadmin);
    });
  }
}
