import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Companies, Locations } from '../../../domain/value-objects/feedback-sample.value-object';
import { FeedbackCardData } from '../../../domain/entities/feedback.entity';
import { FeedbackFacade } from '../../../application/facades/feedback.facade';

@Component({
  selector: 'app-interview-feedback-form-page',
  standalone: false,
  templateUrl: './interview-feedback-form.page.html',
})
export class InterviewFeedbackFormPage {
  currentStep: number = 0;
  steps: string[] = [
    'Company Details',
    'Coding Round',
    'Technical Round',
    'HR Round',
    'Resources Used'
  ];
  
  companyDetailsForm: FormGroup;
  companies = Companies;
  locations = Locations;
  FeedbackFormData: FeedbackCardData;
  temp: any;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('formPage') formPages!: QueryList<ElementRef>;
  
  isBottomReached = false;
  currentSlideHeight = 0;

  constructor(
    private fb: FormBuilder,
    private feedbackFacade: FeedbackFacade
  ) {
    this.companyDetailsForm = this.fb.group({});
    this.FeedbackFormData = this.getDefaultFeedbackFormData();
  }

  ngAfterViewInit(): void {
    this.updateSlideHeight();
    window.addEventListener('resize', this.updateSlideHeight.bind(this));
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
    this.feedbackFacade.submitFeedback(this.FeedbackFormData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollPosition = target.scrollTop + target.clientHeight;
    const bottomPosition = target.scrollHeight;
    this.isBottomReached = scrollPosition >= bottomPosition - 5;
  }

  updateSlideHeight(): void {
    if (!this.formPages) return;
    const currentPage = this.formPages.toArray()[this.currentStep];
    if (currentPage) {
      this.currentSlideHeight = currentPage.nativeElement.scrollHeight;
    }
  }

  OnCodingQuestions([arr, val]: [any[], any]): void {
    if (val == 'DSAQuestions') {
      this.FeedbackFormData.TechnicalRound.DSAQuestion = arr;
    } else if (val == 'DBMSQuestions') {
      this.FeedbackFormData.TechnicalRound.ComputerCoreQuestion = arr;
    } else if (val == 'SystemDesign') {
      this.FeedbackFormData.TechnicalRound.SystemDesignQuestion = arr;
    } else if (val == 'PuzzleBasedQuestions') {
      this.FeedbackFormData.TechnicalRound.PuzzleBasedQuestion = arr;
    } else if (val == 'SituationBasedQuestions') {
      this.FeedbackFormData.HRRound.SituationBasedQuestions = arr;
    } else if (val == 'UnexpectedQuestions') {
      this.FeedbackFormData.HRRound.UnexpectedQuestions = arr;
    } else if (val == 'Resources') {
      this.FeedbackFormData.Resources = arr;
    }
  }

  handleJobProfileChange(event: string): void {
    this.FeedbackFormData.companydetails.jobProfile = event;
  }

  handleJobTypeChange(event: string): void {
    this.FeedbackFormData.companydetails.jobType = event;
  }

  private getDefaultFeedbackFormData(): FeedbackCardData {
    return {
      companydetails: {
        companyName: '',
        jobProfile: '',
        numRounds: 0,
        jobType: '',
        ctc: 6,
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

