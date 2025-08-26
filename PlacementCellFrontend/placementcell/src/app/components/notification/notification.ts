import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone:false,
  templateUrl: './notification.html',
  styleUrl: './notification.less'
})
export class Notification  {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() visible: boolean = false;

  closeNotification() {
    this.visible = false;
  }
}
