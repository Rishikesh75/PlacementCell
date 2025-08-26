import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Companies, Question} from '../models/feedbackcard.model';
import { Locations } from '../models/feedbackcard.model';
import {feedbackcarddata} from '../models/feedbackcard.model';
import {FeedbackFormstudent} from '../service/feedback-formstudent';
@Component({
  selector: 'app-interview-feedback-form-student',
  standalone:false,
  templateUrl: './interview-feedback-form-student.html',
})
export class InterviewFeedbackFormStudent {
  currentStep: number = 0;
  steps: string[] = [
    'Company Details',
    'Coding Round',
    'Technical Round',
    'HR Round',
    'Resources Used'
  ];
  
  // 1. Declare the form group property
  companyDetailsForm: FormGroup;
  companies= Companies;
  locations = Locations;
  FeedbackFormData:feedbackcarddata ;
  temp: any;
  // 2. Inject FormBuilder and initialize the form inside the constructor
  constructor(private fb: FormBuilder, private feedbackFormService: FeedbackFormstudent) {
    this.companyDetailsForm = this.fb.group({
      
    });
    this.FeedbackFormData = this.getDefaultFeedbackFormData();
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      setTimeout(() => this.updateSlideHeight(), 0);
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      setTimeout(() => this.updateSlideHeight(), 0);
    }
  }


  getSliderTransform(): string {
  return `translateX(calc(-${this.currentStep} * (1459.2px)))`;
}

  
  onSubmit(): void {
    console.log("Form Submitted!");
    console.log(this.FeedbackFormData);
    this.feedbackFormService.submitForm(this.FeedbackFormData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }
   @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isBottomReached = false;

  ngAfterViewInit() {
    this.updateSlideHeight();
    // Listen for window resize to update height
    window.addEventListener('resize', this.updateSlideHeight.bind(this));
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollPosition = target.scrollTop + target.clientHeight;
    const bottomPosition = target.scrollHeight;
    this.isBottomReached = scrollPosition >= bottomPosition - 5;
  }

  @ViewChildren('formPage') formPages!: QueryList<ElementRef>;
  currentSlideHeight = 0;

  updateSlideHeight() {
    if (!this.formPages) return;
    const currentPage = this.formPages.toArray()[this.currentStep];
    if (currentPage) {
      // Get the scrollHeight of the current page
      this.currentSlideHeight = currentPage.nativeElement.scrollHeight;
    }
  }

  OnCodingQuestions([arr, val]: [any[], any]) {
  if(val == 'DSAQuestions')
  {
    this.FeedbackFormData.TechnicalRound.DSAQuestion = arr;
  }
  else if(val == 'DBMSQuestions')
  {
    this.FeedbackFormData.TechnicalRound.ComputerCoreQuestion = arr;
  }
  else if(val == 'SystemDesign')
  {
    this.FeedbackFormData.TechnicalRound.SystemDesignQuestion = arr;
  }
  else if(val == 'PuzzleBasedQuestions')
  {
    this.FeedbackFormData.TechnicalRound.PuzzleBasedQuestion = arr;
  }
  else if(val == 'SituationBasedQuestions')
  {
    this.FeedbackFormData.HRRound.SituationBasedQuestions = arr;
  }
  else if(val == 'UnexpectedQuestions')
  {
    this.FeedbackFormData.HRRound.UnexpectedQuestions = arr;
  }
  else if(val == 'Resources')
  {
    this.FeedbackFormData.Resources = arr;
  }
}

  handleJobProfileChange(event: string) {  
    this.FeedbackFormData.companydetails.jobProfile = event;    
  }

  handleJobTypeChange(event: string) {  
    this.FeedbackFormData.companydetails.jobType = event;    
  }


  private getDefaultFeedbackFormData(): feedbackcarddata {
  return {
    companydetails: {
      companyName: '',
      jobProfile: '',
      numRounds: 0,
      jobType: '',
      ctc: 0,
      workMode: '',
      location: ''
    },
    codingroundinfo: {
      codingPlatform: '',
      codingDuration: '',
      codingQuestions: [],
      codingDifficulty: '',
      interviewMode: ''
    },
    TechnicalRound: {
      Interviewmode: '',
      Duration: '',
      DSAQuestion: [],
      ComputerCoreQuestion: [],
      SystemDesignQuestion: [],
      PuzzleBasedQuestion: []
    },
    HRRound: {
      SituationBasedQuestions: [],
      UnexpectedQuestions: []
    },
    Resources: []
  };
}
}
