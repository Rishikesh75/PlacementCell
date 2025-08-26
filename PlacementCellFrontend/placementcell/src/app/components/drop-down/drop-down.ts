import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  standalone:false,
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.less'
})
export class DropDown {
  selectedCompany = '';
  @Output() CompanySelected  = new EventEmitter<string>();
  @Input() DropDownOptions: string[] = [];
  @Input() Label: string = 'Select Company';

  onCompanyChange(value: string) {
    this.CompanySelected.emit(value);   // 🔥 Send value to parent
  }
}
