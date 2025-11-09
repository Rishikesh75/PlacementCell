import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

// Presentation Layer - Pages
import { LoginPage } from './presentation/pages/login/login.page';
import { MainPage } from './presentation/pages/main/main.page';
import { InterviewFeedbackFormPage } from './presentation/pages/interview-feedback-form/interview-feedback-form.page';

// Presentation Layer - Components
import { FeedbackCardComponent } from './presentation/components/feedback-card/feedback-card.component';
import { DropDown } from './presentation/components/drop-down/drop-down';
import { Radiobutton } from './presentation/components/radiobutton/radiobutton';
import { Counter } from './presentation/components/counter/counter';
import { NumberInput } from './presentation/components/number-input/number-input';
import { DurationSelector } from './presentation/components/duration-selector/duration-selector';
import { Greybox } from './presentation/components/greybox/greybox';
import { Inputquestionbox } from './presentation/components/inputquestionbox/inputquestionbox';
import { RadioGroupComponent } from './presentation/components/radio-group/radio-group';
import { Singleinput } from './presentation/components/singleinput/singleinput';
import { Notification } from './presentation/components/notification/notification';

// Feature Modules
import { FeedbackDisplayPageComponent } from './features/interview-feedback/presentation/pages/feedback-display-page/feedback-display-page.component';
import { INFRASTRUCTURE_PROVIDERS } from './features/interview-feedback/infrastructure/providers';

@NgModule({
  declarations: [
    // Pages
    LoginPage,
    MainPage,
    InterviewFeedbackFormPage,
    FeedbackDisplayPageComponent,
    
    // Components
    FeedbackCardComponent,
    DropDown,
    Radiobutton,
    Counter,
    NumberInput,
    DurationSelector,
    Greybox,
    Inputquestionbox,
    RadioGroupComponent,
    Singleinput,
    Notification
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  providers: [
    provideHttpClient(),
    ...INFRASTRUCTURE_PROVIDERS
  ]
})
export class AppModule { }
