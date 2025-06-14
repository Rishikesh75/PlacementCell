import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentInfoComponent } from './student-info/student-info.component';
import { InfoViewAdminComponent } from './info-view-admin.component';
import { ButtonComponent } from '../comman-components/button/button.component';
import { EditableTextComponent } from '../comman-components/button/experience-display/experience-display.component';
import { FormsModule } from '@angular/forms';
import { HcompanyAdminComponent } from './hcompany-admin/hcompany-admin.component';
@NgModule({
  declarations: [StudentInfoComponent,ButtonComponent,EditableTextComponent,InfoViewAdminComponent,HcompanyAdminComponent],
    imports: [
      CommonModule,FormsModule
    ],
    exports: [StudentInfoComponent,EditableTextComponent,InfoViewAdminComponent,HcompanyAdminComponent]
})
export class InfoViewAdminModule { }
