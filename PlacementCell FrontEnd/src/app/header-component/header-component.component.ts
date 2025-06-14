import { Component } from '@angular/core';
@Component({
  selector: 'app-header-component',
  standalone:false,
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.less'
})
export class HeaderComponentComponent {
  isCollapsed = false;
}
