import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-editable-text',
  standalone: false,
  templateUrl: './experience-display.component.html',
  styleUrls: ['./experience-display.component.less']
})
export class EditableTextComponent implements OnChanges {
  @Input() text: string = '';  
  @Input() editMode: boolean = true;
  @Input() deleteMode: boolean = true;
  @Output() textChange = new EventEmitter<string>();

  isEditing: boolean = false;

  @ViewChild('textInput') textInput!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editMode'] && changes['editMode'].currentValue === true) {
      this.enableEditing();
    }
    if(changes['deleteMode'] && changes['deleteMode'].currentValue === true)
    {
      this.enableDelete();
    }
  }
  enableDelete()
  {
    this.text = 'Text has been deleted';
    setTimeout(() => this.textInput?.nativeElement.focus(), 0);
    this.deleteMode = false;
  }
  enableEditing() {
    this.isEditing = true;
    setTimeout(() => this.textInput?.nativeElement.focus(), 0);
  }

  disableEditing() {
    this.isEditing = false;
    this.textChange.emit(this.text);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.disableEditing();
    }
  }
}
