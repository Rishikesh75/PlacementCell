import { Routes } from '@angular/router';
import {InterviewFeedbackFormStudent} from './interview-feedback-form-student/interview-feedback-form-student'
import { Loginpage } from './loginpage/loginpage';
// Old import - keeping for backwards compatibility
// import {StudentinterviewfeedbackDisplay} from './studentinterviewfeedback-display/studentinterviewfeedback-display';
// New import - using layered architecture
import { FeedbackDisplayPageComponent } from './features/interview-feedback/presentation/pages/feedback-display-page/feedback-display-page.component';
import { Mainpage } from './mainpage/mainpage';
export const routes: Routes = [

    {
    path: '',
    redirectTo: 'student/login',
    pathMatch: 'full' 
    },
    {
    path: 'student/interview-feedback',
    component: InterviewFeedbackFormStudent
    },
    {
        path: 'student/login',
        component: Loginpage
    },
    {
        path: 'student/interview-feedback-display',
        component: FeedbackDisplayPageComponent
    },
    {
        path: 'student/mainpage',
        component: Mainpage
    }
];
