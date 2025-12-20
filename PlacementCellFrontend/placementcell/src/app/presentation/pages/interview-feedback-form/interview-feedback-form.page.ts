import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Companies, Locations } from '../../../core/constants/companies.constants';
import {
  Feedback,
  CompanyDetails,
  CodingRound,
  TechnicalRound,
  HRRound,
  Resource
} from '../../../domain/entities';
import { InterviewFeedbackFacade } from '../../../application/facades/interview-feedback.facade';

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
  FeedbackFormData: Feedback;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('formPage') formPages!: QueryList<ElementRef>;
  
  isBottomReached = false;
  currentSlideHeight = 0;

  constructor(
    private fb: FormBuilder,
    private feedbackFacade: InterviewFeedbackFacade
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
      this.FeedbackFormData.technicalRound.dsaQuestions = arr;
    } else if (val == 'DBMSQuestions') {
      this.FeedbackFormData.technicalRound.computerCoreQuestions = arr;
    } else if (val == 'SystemDesign') {
      this.FeedbackFormData.technicalRound.systemDesignQuestions = arr;
    } else if (val == 'PuzzleBasedQuestions') {
      this.FeedbackFormData.technicalRound.puzzleBasedQuestions = arr;
    } else if (val == 'SituationBasedQuestions') {
      this.FeedbackFormData.hrRound.situationBasedQuestions = arr;
    } else if (val == 'UnexpectedQuestions') {
      this.FeedbackFormData.hrRound.unexpectedQuestions = arr;
    } else if (val == 'Resources') {
      this.FeedbackFormData.resources = arr;
    }
  }

  handleJobProfileChange(event: string): void {
    this.FeedbackFormData.companyDetails.jobProfile = event;
  }

  handleJobTypeChange(event: string): void {
    this.FeedbackFormData.companyDetails.jobType = event as any;
  }

  private getDefaultFeedbackFormData(): Feedback {
    const companyDetails = new CompanyDetails('', '', 0, '', 6, '', '');
    const codingRound = new CodingRound('', '', [], '', '');
    const technicalRound = new TechnicalRound('', '', [], [], [], []);
    const hrRound = new HRRound([], []);
    const resources: Resource[] = [];

    return new Feedback(
      companyDetails,
      codingRound,
      technicalRound,
      hrRound,
      resources
    );
  }
}

