import { Routes } from '@angular/router';

// Presentation Layer - Pages
import { LoginPage } from './presentation/pages/login/login.page';
import { MainPage } from './presentation/pages/main/main.page';
import { InterviewFeedbackFormPage } from './presentation/pages/interview-feedback-form/interview-feedback-form.page';

// Feature Modules
import { FeedbackDisplayPageComponent } from './features/interview-feedback/presentation/pages/feedback-display-page/feedback-display-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'student/login',
        pathMatch: 'full' 
    },
    {
        path: 'student/login',
        component: LoginPage
    },
    {
        path: 'student/mainpage',
        component: MainPage
    },
    {
        path: 'student/interview-feedback',
        component: InterviewFeedbackFormPage
    },
    {
        path: 'student/interview-feedback-display',
        component: FeedbackDisplayPageComponent
    }
];
