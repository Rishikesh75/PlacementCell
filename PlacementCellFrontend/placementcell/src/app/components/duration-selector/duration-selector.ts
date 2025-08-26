import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-duration-selector',
  standalone:false,
  templateUrl: './duration-selector.html',
  styleUrls: ['./duration-selector.less']
})
export class DurationSelector {
  hours = 0;
  minutes = 0;
  @Output() durationChange = new EventEmitter<string>();
  hoursList = Array.from({ length: 6 }, (_, i) => i); // 0 to 12 hours
  minutesList = [0, 15, 30, 45];

  onDurationChange() {
    const totalMinutes = this.hours * 60 + this.minutes;
    this.durationChange.emit(totalMinutes.toString());
    console.log('Duration in minutes:', totalMinutes);
  }
}
