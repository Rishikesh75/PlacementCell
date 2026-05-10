import { Injectable } from '@angular/core';
import { NotificationType } from '../enums/notification.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  show(message: string, type: NotificationType = NotificationType.INFO): void {
    // Simple alert implementation - can be enhanced with a proper notification component
    alert(`${type.toUpperCase()}: ${message}`);
  }
}
