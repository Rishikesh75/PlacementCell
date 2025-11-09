import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from '../enums/notification.enum';
import { APP_CONSTANTS } from '../constants';

/**
 * Core notification service for displaying user feedback messages
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show a notification message
   * @param message - The message to display
   * @param type - Type of notification (success, error, warning, info)
   * @param duration - Duration in milliseconds (default: 3000)
   */
  show(message: string, type: NotificationType = NotificationType.INFO, duration: number = APP_CONSTANTS.NOTIFICATION.DURATION): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: APP_CONSTANTS.NOTIFICATION.POSITION.HORIZONTAL as any,
      verticalPosition: APP_CONSTANTS.NOTIFICATION.POSITION.VERTICAL as any,
      panelClass: [`notification-${type}`]
    });
  }

  /**
   * Show a success notification
   */
  success(message: string, duration?: number): void {
    this.show(message, NotificationType.SUCCESS, duration);
  }

  /**
   * Show an error notification
   */
  error(message: string, duration?: number): void {
    this.show(message, NotificationType.ERROR, duration);
  }

  /**
   * Show a warning notification
   */
  warning(message: string, duration?: number): void {
    this.show(message, NotificationType.WARNING, duration);
  }

  /**
   * Show an info notification
   */
  info(message: string, duration?: number): void {
    this.show(message, NotificationType.INFO, duration);
  }
}

