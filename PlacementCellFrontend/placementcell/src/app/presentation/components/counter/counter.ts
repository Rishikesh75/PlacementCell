import { O } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone:false,
  templateUrl: './counter.html',
  styleUrl: './counter.less'
})
export class Counter {
  count = 1;
  @Output() countChange = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }

  decrement() {
    if (this.count > 1) { // Prevent going below 1
      this.count--;
      this.countChange.emit(this.count);
    }
  }
}
