import { Routes } from '@angular/router';
import {InterviewFeedbackFormStudent} from './interview-feedback-form-student/interview-feedback-form-student'
import { Loginpage } from './loginpage/loginpage';
import {StudentinterviewfeedbackDisplay} from './studentinterviewfeedback-display/studentinterviewfeedback-display';
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
        component: StudentinterviewfeedbackDisplay
    },
    {
        path: 'student/mainpage',
        component: Mainpage
    }
];
