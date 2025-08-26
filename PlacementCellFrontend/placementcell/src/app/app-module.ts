import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InterviewFeedbackFormStudent} from './interview-feedback-form-student/interview-feedback-form-student';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropDown} from './components/drop-down/drop-down'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {Radiobutton} from './components/radiobutton/radiobutton';
import { Counter } from './components/counter/counter';
import {NumberInput} from './components/number-input/number-input';
import { DurationSelector } from './components/duration-selector/duration-selector'; 
import { Greybox } from './components/greybox/greybox';
import { Inputquestionbox } from './components/inputquestionbox/inputquestionbox';
import { Loginpage } from './loginpage/loginpage';
import {StudentinterviewfeedbackDisplay} from './studentinterviewfeedback-display/studentinterviewfeedback-display';
import { Mainpage } from './mainpage/mainpage';
import {Feedbackcard} from './feedbackcard/feedbackcard';
import {RadioGroupComponent} from './components/radio-group/radio-group';
import { HttpClientModule } from '@angular/common/http';
import {Singleinput} from './components/singleinput/singleinput';
import {Notification} from './components/notification/notification';
@NgModule({
  declarations: [InterviewFeedbackFormStudent,DropDown,Radiobutton,Counter, NumberInput, DurationSelector,Greybox, Inputquestionbox, Loginpage, StudentinterviewfeedbackDisplay, Mainpage, Feedbackcard, RadioGroupComponent, Singleinput, Notification],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AppModule { }
