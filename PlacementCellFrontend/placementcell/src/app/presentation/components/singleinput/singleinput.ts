import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-singleinput',
  standalone:false,
  templateUrl: './singleinput.html',
  styleUrl: './singleinput.less'
})
export class Singleinput {
  inputValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  onInputChange(value: string) {
    this.inputValue = value;
    this.valueChange.emit(this.inputValue);
  }
}
