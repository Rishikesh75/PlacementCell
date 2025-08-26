import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone:false,
  templateUrl: './radiobutton.html',
  styleUrl: './radiobutton.less'
})
export class Radiobutton {
  
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  innerValue: any;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  onChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.innerValue = input.value;
    this.onChange(this.innerValue);
    this.onTouched();
  }

  writeValue(value: any): void { this.innerValue = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
