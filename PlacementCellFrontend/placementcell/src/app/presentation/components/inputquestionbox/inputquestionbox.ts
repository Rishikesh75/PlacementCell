import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inputquestionbox',
  standalone:false,
  templateUrl: './inputquestionbox.html',
  styleUrl: '../../../styles/components/inputquestionbox.less'
})
export class Inputquestionbox {
   textValue: string = '';

  // 🔹 Output Event Emitter
  @Output() submitted = new EventEmitter<string>();

  // Triggered when Enter is pressed
  onEnterPressed(event: any) {
    event.preventDefault();   // Prevents newline inside textarea
    
    if (this.textValue.trim()) {
      this.submitted.emit(this.textValue); // emit value to parent
      console.log('Submitted:', this.textValue);
    }
  }
}
