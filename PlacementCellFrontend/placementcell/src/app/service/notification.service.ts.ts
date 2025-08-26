import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import {Notification} from '../components/notification/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceTs {
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    // Dynamically create the component
    const notificationRef: ComponentRef<Notification> =
      createComponent(Notification, {
        environmentInjector: this.injector
      });

    // Set inputs
    notificationRef.instance.message = message;
    notificationRef.instance.type = type;
    notificationRef.instance.visible = true;

    // Attach to application root
    this.appRef.attachView(notificationRef.hostView);

    const domElem = (notificationRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Auto remove after 5 sec
    setTimeout(() => {
      this.appRef.detachView(notificationRef.hostView);
      notificationRef.destroy();
    }, 5000);
  }
}
