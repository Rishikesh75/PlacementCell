import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearComponentComponent } from './year-component/year-component.component';
import { HighestPackageComponentComponent } from './highest-package-component/highest-package-component.component';
import { HeaderComponentComponent } from './header-component.component';
import { InfoviewModule } from '../info-view/infoview.module';
import { AdminService } from './admin.service';
@NgModule({
  declarations: [
    YearComponentComponent,
    HighestPackageComponentComponent,
    HeaderComponentComponent,
  ],
  imports: [
    CommonModule,InfoviewModule
  ],
  providers: [AdminService],
  exports: [
    YearComponentComponent,
    HighestPackageComponentComponent,
    HeaderComponentComponent
  ]
})
export class HeaderModuleModule { }
