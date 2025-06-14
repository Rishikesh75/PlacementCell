import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less']
})
export class SidebarComponent {
  menuItems = [
    { icon: '/admin.png', label: 'Admin', link: '/dashboard?admin=true' },
    { icon: '/student.png', label: 'Student',link:'/dashboard?admin=false' },
    { icon: '/user.png', label: 'Comapany-Review-form', link: '/company-feedback-form' },
    {icon:'/online-survey.png',label:'Alumni-feedback-form',link:'/add-review'},
    {icon:'/logout.png',label:'Logout',link:'#'}
  ];
}
