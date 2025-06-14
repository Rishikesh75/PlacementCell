import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoViewComponent } from './info-view.component';
import { FormsModule } from '@angular/forms';
import { StudentInfoNEComponent } from './student-info-ne/student-info-ne.component';
import { Router, RouterModule } from '@angular/router';
@NgModule({
  declarations: [InfoViewComponent,StudentInfoNEComponent],
  imports: [
    CommonModule,FormsModule,RouterModule
  ],
  exports: [InfoViewComponent]
})
export class InfoviewModule { }
