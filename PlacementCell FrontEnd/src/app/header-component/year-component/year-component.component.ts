import { Component } from '@angular/core';

@Component({
  selector: 'app-year-component',
  standalone:false,
  templateUrl: './year-component.component.html',
  styleUrl: './year-component.component.less'
})
export class YearComponentComponent {
  editmode: boolean = true;
}
