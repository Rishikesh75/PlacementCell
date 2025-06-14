import { Component,OnInit } from '@angular/core';
import { HeaderModuleModule } from './header-component/header-module.module';
import { AddReviewModule } from './add-review/add-review.module';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InfoViewAdminModule } from './info-view-admin/info-view-admin.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HeaderModuleModule,RouterOutlet,AddReviewModule,InfoViewAdminModule,SidebarComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent  {
  title = 'placement-review';
  isSidebarOpen = false;
  constructor() {}
  

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

