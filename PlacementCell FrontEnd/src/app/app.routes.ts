import { Routes } from '@angular/router';
import { AddReviewComponent } from './add-review/add-review.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { InfoViewAdminComponent } from './info-view-admin/info-view-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyFeedBackFormComponent } from './company-feed-back-form/company-feed-back-form.component';
import { CompanyReviewDisplayComponent } from './company-review-display/company-review-display.component';
export const routes: Routes = [
    {path: 'student', component: HeaderComponentComponent},
    {path: 'add-review', component: AddReviewComponent},
    {path: 'admin', component: InfoViewAdminComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'company-feedback-form', component: CompanyFeedBackFormComponent},
    {path: 'company-review-display', component: CompanyReviewDisplayComponent}
];
