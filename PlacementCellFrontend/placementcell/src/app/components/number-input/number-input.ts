import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input.html',
  styleUrls: ['./number-input.less'] // corrected property name from 'styleUrl' to 'styleUrls'
})
export class NumberInput {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: number = 6;
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(event: any) {
    const val = event.target.value ? Number(event.target.value) : undefined;
    console.log(`Number Input Changed: ${val}`);
    this.valueChange.emit(val);
  }
}