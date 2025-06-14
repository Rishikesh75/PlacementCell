import { Component } from '@angular/core';

@Component({
  selector: 'app-highestpackage-component',
  standalone:false,
  templateUrl: './highest-package-component.component.html',
  styleUrl: './highest-package-component.component.less'
})
export class HighestPackageComponentComponent {
  editmode:boolean = true;
  constructor() { }
}
