import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-button',
  standalone:false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.less'
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';  // Default text
}
