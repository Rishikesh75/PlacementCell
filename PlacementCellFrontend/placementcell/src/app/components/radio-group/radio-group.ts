// radio-group.component.ts
import { Component, ContentChildren, QueryList, AfterContentInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Radiobutton } from '../radiobutton/radiobutton';

@Component({
  selector: 'app-radio-group',
  template: `<ng-content></ng-content>`,
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @Input() name!: string;

  @ContentChildren(Radiobutton) radios!: QueryList<Radiobutton>;

  @Output() valueChange = new EventEmitter<string>();

  private innerValue: string = '';
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngAfterContentInit() {
    // Assign name and subscribe to child changes
    this.radios.forEach(radio => {
      radio.name = this.name;

      radio.registerOnChange((val: any) => {
        this.writeValue(val);
        this.onChange(this.innerValue);
      });
      radio.registerOnTouched(() => this.onTouched());
    });
  }

  // CVA methods
  writeValue(value: any): void {
    this.innerValue = value;
    if (this.radios) {
      this.radios.forEach(radio => radio.writeValue(value));
    }
    console.log(`RadioGroup Value: ${this.innerValue}`);
    this.valueChange.emit(this.innerValue);
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
